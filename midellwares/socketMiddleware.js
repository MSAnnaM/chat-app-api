const socketMiddleware = (io) => {  
  return (req, res, next) => {  
    if (io) {
      console.log("Socket.IO object is available");
      req.io = io; 
      
    } else {
      console.error("Socket.IO not initialized");
    }
    next();  
  };  
};  

export default socketMiddleware;