const ensureAuthenticated = (req, res, next) => { 
    if (req.isAuthenticated()) {  
        console.log(req.user);
        
        return next();
    }  
    return next() 
};  

export default ensureAuthenticated