module.exports = {
    port: process.env.PORT || 4000,
    secret: process.env.JWT_SECRET || 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
    api_root: '/api',
    api_version: 'v1'
}
