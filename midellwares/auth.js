const ensureAuthenticated = (req, res, next) => { 
    if (req.isAuthenticated()) {  
        console.log(req.user);
        
        return next();
    } else{ return next()} 
    
};  

export default ensureAuthenticated