var glasses = []

function getGlasses() {
	if(glasses.length == 0){
		var glassNumber = 0;
		for(var i = 0; i < recipesJson.length; i++) {
			if(!glassLoaded(recipesJson[i].glass['@attributes'].id)) {
				var glass = new Glass();
				glass.setListNumber(glassNumber);
				glass.setId(recipesJson[i].glass['@attributes'].id);
				glass.setName(recipesJson[i].glass['@attributes'].name);
				glass.setDescription(recipesJson[i].glass['@attributes'].description);
				glass.setVolumeMl(recipesJson[i].glass['@attributes'].volumeMl);
				glass.setPhotoId(recipesJson[i].glass.photo['@attributes'].id);
				glasses.push(glass);
				glassNumber++;
			}
		}
	}
	return glasses;
}

function glassLoaded(id) {
	for(var i = 0; i < glasses.length; i++) {
		if(glasses[i].getId() == id) {
			return true;
		}
	}
	return false;
}

function getGlass(id) {
	for(var i = 0; i < glasses.length; i++) {
		if(glasses[i].getId() == id) {
			return glasses[i];
		}
	}
	return null;
}

function Glass() {
	this.listNumber;
	this.id;
	this.name;
	this.description;
	this.volumeMl;
	this.photoId;
}

Glass.prototype.setListNumber = function (value) {
	this.listNumber = value;
}
Glass.prototype.getListNumber = function () {
	return this.listNumber;
}
Glass.prototype.setId = function (value) {
	this.id = value;
}
Glass.prototype.getId = function () {
	return this.id;
}
Glass.prototype.setName = function (value) {
	this.name = value;
}
Glass.prototype.getName = function () {
	return this.name;
}
Glass.prototype.setDescription = function (value) {
	this.description = value;
}
Glass.prototype.getDescription = function () {
	return this.description;
}
Glass.prototype.setVolumeMl = function (value) {
	this.volumeMl = value;
}
Glass.prototype.getVolumeMl = function () {
	return this.volumeMl;
}
Glass.prototype.setPhotoId = function (value) {
	this.photoId = value;
}
Glass.prototype.getPhotoId = function () {
	return this.photoId;
}