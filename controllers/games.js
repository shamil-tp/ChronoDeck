exports.GetStonePage = (req, res) => {
    try {
        let username = req.user && req.user.name ? req.user.name : 'Guest'
        if(!(username)){
            return res.render('home/home',{username:'Guest'})
        }
        return res.render('games/stonepaper/stone',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
exports.GetAirPage = (req, res) => {
    try {
        let username = req.user && req.user.name ? req.user.name : 'Guest'
        if(!(username)){
            return res.render('home/home',{username:'Guest'})
        }
        return res.render('games/airstrike/air',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
exports.GetDinoPage = (req, res) => {
    try {
        let username = req.user && req.user.name ? req.user.name : 'Guest'
        if(!(username)){
            return res.render('home/home',{username:'Guest'})
        }
        return res.render('games/dinogame/dino',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
exports.GetTrafficPage = (req, res) => {
    try {
        let username = req.user && req.user.name ? req.user.name : 'Guest'
        if(!(username)){
            return res.render('home/home',{username:'Guest'})
        }
        return res.render('games/trafficracer/traffic',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
exports.GetTicPage = (req, res) => {
    try {
        let username = req.user && req.user.name ? req.user.name : 'Guest'
        if(!(username)){
            return res.render('home/home',{username:'Guest'})
        }
        return res.render('games/tictactoe/tic',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}