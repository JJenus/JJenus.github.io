import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { networkInterfaces } from 'os';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const ROOT_DIR = path.join(__dirname, '..'); // Point to project root, not scripts folder
const AUTO_OPEN = process.env.AUTO_OPEN !== 'false';
const VERBOSE = process.env.VERBOSE === 'true';

// MIME types for proper content serving
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8'
};

// Stats tracking
const stats = {
    startTime: Date.now(),
    totalRequests: 0,
    errors: 0,
    bytesServed: 0
};

const server = http.createServer((req, res) => {
    const startTime = Date.now();
    stats.totalRequests++;

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        });
        res.end();
        logRequest(req, res, startTime);
        return;
    }

    // Only allow GET and HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        logRequest(req, res, startTime);
        return;
    }

    // Parse URL and normalize
    let url = req.url.split('?')[0];
    url = decodeURIComponent(url);
    
    // Default to index.html
    if (url === '/') {
        url = '/index.html';
    }

    // Clean the path
    const filePath = path.normalize(path.join(ROOT_DIR, url));
    const ext = path.extname(filePath).toLowerCase();

    // Security: Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(createErrorPage(403, 'Forbidden - Access Denied'));
        logRequest(req, res, startTime);
        return;
    }

    // Serve the file
    serveFile(filePath, ext, req, res, startTime);
});

function serveFile(filePath, ext, req, res, startTime) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            handleFileError(err, req, res, startTime);
            return;
        }

        // If it's a directory, try index.html
        if (stats.isDirectory()) {
            const indexPath = path.join(filePath, 'index.html');
            fs.stat(indexPath, (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(createErrorPage(404, 'Page Not Found'));
                    logRequest(req, res, startTime);
                } else {
                    serveFile(indexPath, '.html', req, res, startTime);
                }
            });
            return;
        }

        // Set MIME type with ES module detection
        let contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Build response headers
        const headers = {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-XSS-Protection': '1; mode=block',
            'Server': 'Jenus-Portfolio-Dev'
        };

        // Track bytes served
        stats.bytesServed += stats.size;

        // Handle HEAD requests (no body)
        if (req.method === 'HEAD') {
            res.writeHead(200, headers);
            res.end();
            logRequest(req, res, startTime);
            return;
        }

        res.writeHead(200, headers);

        // Stream the file with error handling
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

        stream.on('error', (error) => {
            console.error(`❌ Stream error for ${filePath}:`, error.message);
            if (!res.headersSent) {
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        });

        stream.on('end', () => {
            logRequest(req, res, startTime);
        });
    });
}

function handleFileError(err, req, res, startTime) {
    stats.errors++;
    
    if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(createErrorPage(404, 'Page Not Found'));
    } else if (err.code === 'EACCES' || err.code === 'EPERM') {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(createErrorPage(403, 'Access Denied'));
    } else {
        console.error('❌ Server error:', err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(createErrorPage(500, 'Internal Server Error'));
    }
    
    logRequest(req, res, startTime);
}

function createErrorPage(code, message) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${code} - ${message}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .error-container {
            text-align: center;
            padding: 2rem;
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h1 {
            font-size: 8rem;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            font-weight: 700;
        }
        p {
            font-size: 1.5rem;
            margin: 1rem 0;
            opacity: 0.9;
        }
        a {
            display: inline-block;
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border: 2px solid rgba(255,255,255,0.8);
            border-radius: 50px;
            margin-top: 1rem;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        a:hover {
            background: white;
            color: #667eea;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>${code}</h1>
        <p>${message}</p>
        <a href="/">← Back to Homepage</a>
        ${code === 404 ? '<p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.7;">The page you\'re looking for doesn\'t exist or has been moved.</p>' : ''}
    </div>
</body>
</html>`;
}

function logRequest(req, res, startTime) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    const colors = {
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
        cyan: '\x1b[36m',
        gray: '\x1b[90m',
        reset: '\x1b[0m'
    };
    
    const statusColor = 
        statusCode < 300 ? colors.green :
        statusCode < 400 ? colors.yellow :
        colors.red;
    
    const methodColor = {
        'GET': colors.cyan,
        'POST': colors.yellow,
        'PUT': colors.yellow,
        'DELETE': colors.red
    }[req.method] || colors.reset;
    
    if (VERBOSE || statusCode >= 400) {
        console.log(
            `${colors.gray}[${new Date().toLocaleTimeString()}]${colors.reset} ` +
            `${methodColor}${req.method}${colors.reset} ` +
            `${req.url} ` +
            `${statusColor}${statusCode}${colors.reset} ` +
            `${colors.gray}${duration}ms${colors.reset}`
        );
    }
}

function getLocalIP() {
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

async function openBrowser(url) {
    const platform = process.platform;
    
    try {
        if (platform === 'darwin') {
            exec(`open "${url}"`);
        } else if (platform === 'win32') {
            exec(`start "" "${url}"`);
        } else {
            exec(`xdg-open "${url}"`);
        }
        console.log('🌐 Browser opened automatically\n');
        return true;
    } catch (error) {
        console.log('💡 Open manually:', url, '\n');
        return false;
    }
}

function displayStartupBanner() {
    const localUrl = `http://${HOST}:${PORT}`;
    const networkUrl = `http://${getLocalIP()}:${PORT}`;
    
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║                                              ║');
    console.log('║   🚀  Jenus Portfolio - Dev Server Ready     ║');
    console.log('║                                              ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log('║                                              ║');
    console.log(`║   📦 Local:   \x1b[36m${localUrl}\x1b[0m${' '.repeat(Math.max(0, 27 - localUrl.length))}║`);
    if (HOST === 'localhost') {
        console.log(`║   🌐 Network: \x1b[36m${networkUrl}\x1b[0m${' '.repeat(Math.max(0, 27 - networkUrl.length))}║`);
    }
    console.log('║                                              ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log('║                                              ║');
    console.log('║   📁 Root:    Current directory              ║');
    console.log('║   📝 Logs:    Errors always shown            ║');
    console.log('║   🔍 Verbose: Set VERBOSE=true for all logs  ║');
    console.log('║   ⌨️  Stop:   Press Ctrl+C                   ║');
    console.log('║                                              ║');
    console.log('╚══════════════════════════════════════════════╝\n');
}

function displayStats() {
    const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    
    const uptimeStr = hours > 0 
        ? `${hours}h ${minutes}m ${seconds}s`
        : minutes > 0 
            ? `${minutes}m ${seconds}s`
            : `${seconds}s`;
    
    const mbServed = (stats.bytesServed / (1024 * 1024)).toFixed(2);
    
    console.log('\n📊 Server Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`⏱️  Uptime:     ${uptimeStr}`);
    console.log(`📨 Requests:   ${stats.totalRequests}`);
    console.log(`❌ Errors:     ${stats.errors}`);
    console.log(`📦 Data:       ${mbServed} MB served`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use!`);
        console.error(`   Try a different port: PORT=3001 npm run dev\n`);
        process.exit(1);
    } else {
        console.error('❌ Server error:', error);
    }
});

// Start server
server.listen(PORT, HOST, async () => {
    displayStartupBanner();
    
    if (AUTO_OPEN) {
        await openBrowser(`http://${HOST}:${PORT}`);
    }
});

// Graceful shutdown
function gracefulShutdown(signal) {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    displayStats();
    
    server.close(() => {
        console.log('✅ Server stopped\n');
        process.exit(0);
    });
    
    setTimeout(() => {
        console.error('❌ Forced shutdown after timeout');
        process.exit(1);
    }, 5000);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});