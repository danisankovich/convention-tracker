module.exports = {
  locationFormatter: (loc) => {
    const location = {};
    _.each(loc, (segment, key) => {
      location[key] = segment
        .split(' ')
        .map(part => `${part.substr(0, 1).toUpperCase()}${part.substr(1).toLowerCase()}`).join(' ').trim();
    });
    return location;
  }
}
