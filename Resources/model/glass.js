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

Glass.getGlasses = function () {
	if(Titanium.Locale.currentLanguage=="de"){
		Ti.include("../data/recipes_de.js");
	} else {
		Ti.include("../data/recipes.js");
	}
	var glasses = [];
	var glassNumber = 0;
	for(var i = 0; i < recipesJson.length; i++) {
		if(!Glass.glassLoaded(recipesJson[i].glass['@attributes'].id, glasses)) {
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
	return glasses;
}

Glass.glassLoaded = function (id, glasses) {
	for(var i = 0; i < glasses.length; i++) {
		if(glasses[i].getId() == id) {
			return true;
		}
	}
	return false;
}

Glass.getGlass = function (id, glasses) {
	for(var i = 0; i < glasses.length; i++) {
		if(glasses[i].getId() == id) {
			return glasses[i];
		}
	}
	return null;
}