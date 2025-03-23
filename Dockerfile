FROM node:18-alpine

WORKDIR /app

# Copy file package.json và package-lock.json trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --legacy-peer-deps

# Copy toàn bộ source code vào container
COPY . .

# Đặt môi trường production
ENV NODE_ENV=production
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_PRIVATE_SKIP_ESLINT=1

# Build ứng dụng Next.js
RUN npm run build

# Expose port cho ứng dụng Next.js (mặc định là 3000)
EXPOSE 3000

# Chạy ứng dụng Next.js ở chế độ production
CMD ["npm", "run", "start"]
