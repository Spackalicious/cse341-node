const paulRoute = (req, res) => {
  res.send('Paul Spackman');
};

const gabbyRoute = (req, res) => {
    res.send("Gabby Spackman");
};

const lydiaRoute = (req, res) => {
    res.send("Lydia Spackman");
};

const millieRoute = (req, res) => {
    res.send("Emmelia Spackman");
};

module.exports = {
    paulRoute,
    gabbyRoute, 
    lydiaRoute, 
    millieRoute
};