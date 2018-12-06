module.exports = app => {
    app.listen(process.env.PORT || 4200,  () => {
        console.log('server running');
    });
}