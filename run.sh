cd /app/server
pm2 start dist/main.js --name server
cd /app/web
pm2 start npm --name web -- run preview

pm2 logs
