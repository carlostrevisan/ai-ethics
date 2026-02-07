# VPS Deployment Guide

Guide for deploying Triple-Reasoning Chat Analyzer to a VPS.

## Prerequisites

Your VPS needs:
- Ubuntu 20.04+ (or similar Linux distribution)
- Docker and Docker Compose installed
- Git installed
- A domain name pointing to your VPS (optional, for SSL)

## Step 1: Prepare Your Local Machine

1. **Commit and push your code to GitHub** (if using Git):
   ```bash
   cd /Users/carlostrevisan/Documents/GitHub/ai-ethics
   git add .
   git commit -m "Prepare for VPS deployment"
   git push origin main
   ```

2. **Or prepare to copy files directly via SCP** (if not using Git).

## Step 2: Connect to Your VPS

```bash
# Replace with your VPS IP and username
ssh username@your-vps-ip
```

## Step 3: Install Docker on VPS (if not already installed)

```bash
# Update package list
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (no sudo needed)
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and back in for group changes
exit
ssh username@your-vps-ip

# Verify installation
docker --version
docker-compose --version
```

## Step 4: Get Your Code on the VPS

### Option A: Clone from GitHub (Recommended)
```bash
cd ~
git clone https://github.com/YOUR_USERNAME/ai-ethics.git
cd ai-ethics
```

### Option B: Copy files via SCP (from your local machine)
```bash
# Run this from your LOCAL machine
cd /Users/carlostrevisan/Documents/GitHub
tar -czf ai-ethics.tar.gz ai-ethics/
scp ai-ethics.tar.gz username@your-vps-ip:~

# Then on VPS
ssh username@your-vps-ip
tar -xzf ai-ethics.tar.gz
cd ai-ethics
```

## Step 5: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add your configuration:
```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your-actual-api-key-here
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free

# Server Configuration
PORT=5001
NODE_ENV=production

# Frontend Configuration (use your VPS IP or domain)
REACT_APP_API_URL=http://YOUR_VPS_IP:5001
```

Save with `Ctrl+O`, exit with `Ctrl+X`.

## Step 6: Build and Run Docker Containers

```bash
# Build and start containers
docker-compose up -d --build

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

## Step 7: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000  # Frontend
sudo ufw allow 5001  # Backend API
sudo ufw enable

# Check firewall status
sudo ufw status
```

## Step 8: Access Your Application

- **Frontend**: http://YOUR_VPS_IP:3000
- **Backend API**: http://YOUR_VPS_IP:5001

## Step 9: (Optional) Set Up Nginx Reverse Proxy

For production, use Nginx as a reverse proxy to serve on port 80:

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ai-ethics
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or VPS IP

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ai-ethics /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 10: (Optional) Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
# Test renewal
sudo certbot renew --dry-run
```

## Useful Docker Commands

```bash
# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild after code changes
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

## Updating Your Application

```bash
# If using Git
cd ~/ai-ethics
git pull origin main
docker-compose up -d --build

# If using SCP, re-upload files and rebuild
docker-compose down
# Upload new files
docker-compose up -d --build
```

## Troubleshooting

### Check if ports are in use:
```bash
sudo netstat -tulpn | grep -E ':(3000|5001|80|443)'
```

### Check Docker container status:
```bash
docker-compose ps
docker-compose logs backend
docker-compose logs frontend
```

### Restart everything:
```bash
docker-compose down
docker-compose up -d --build
```

### Check disk space:
```bash
df -h
docker system prune -a  # Clean up unused Docker resources
```

## Security Best Practices

1. **Keep your `.env` file secure** - never commit it to Git
2. **Use strong passwords** for your VPS
3. **Keep Docker updated**: `sudo apt update && sudo apt upgrade`
4. **Use SSL/HTTPS** in production
5. **Set up automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure --priority=low unattended-upgrades
   ```

## Monitoring

Monitor your application with:
```bash
# Check resource usage
docker stats

# Monitor logs in real-time
docker-compose logs -f

# Check system resources
htop  # Install with: sudo apt install htop
```
