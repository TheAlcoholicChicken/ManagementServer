module.exports = {
    handle(err) {
        console.log(err);
        return {error: err}
    }
}