# Multi-stage build for Node.js backend with Oracle Database support

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install necessary dependencies for Oracle Instant Client
RUN apk add --no-cache libaio libnsl libc6-compat curl unzip

# Download and install Oracle Instant Client
RUN mkdir -p /opt/oracle /etc/ld.so.conf.d && \
    cd /opt/oracle && \
    curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite.zip && \
    rm -f instantclient-basiclite.zip && \
    cd /opt/oracle/instantclient* && \
    rm -f *jdbc* *occi* *mysql* *README *jar uidrvci genezi adrci && \
    echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig || true

# Set Oracle environment variables
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_1

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --production

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libaio libnsl libc6-compat

# Create directory for ld config
RUN mkdir -p /etc/ld.so.conf.d

# Copy Oracle Instant Client from deps stage
COPY --from=deps /opt/oracle /opt/oracle
COPY --from=deps /etc/ld.so.conf.d/oracle-instantclient.conf /etc/ld.so.conf.d/

# Set Oracle environment variables
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application files
COPY . .

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
