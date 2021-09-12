module.exports = {
    fetchImageMetadata: function(id) {
        return {
            id,
            name: 'this is the name'
        }
    },
    createUser: function(username) {
        console.log(`user created: ${username}`)
    }
}