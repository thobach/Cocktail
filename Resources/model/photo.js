var photos = []

function getPhotos() {
	if(photos.length == 0){
		var photoNumber = 0;
		for(var i = 0; i < recipesJson.length; i++) {
			// glass photo
			if(!photoLoaded(recipesJson[i].glass.photo['@attributes'].id)) {
				var photo = new Photo();
				photo.setListNumber(photoNumber);
				photo.setId(recipesJson[i].glass.photo['@attributes'].id);
				photo.setName(recipesJson[i].glass.photo['@attributes'].name);
				photo.setDescription(recipesJson[i].glass.photo['@attributes'].description);
				photo.setUrl(recipesJson[i].glass.photo['@attributes'].url);
				photo.setOriginalFileName(recipesJson[i].glass.photo['@attributes'].originalFileName);
				photo.setPhotoCategory(recipesJson[i].glass.photo['@attributes'].photoCategory);
				photos.push(photo);
				photoNumber++;
			}
			// recipe photos
			if(recipesJson[i].photos.photo != null && !photoLoaded(recipesJson[i].photos.photo['@attributes'].id)) {
				var photo = new Photo();
				photo.setListNumber(photoNumber);
				photo.setId(recipesJson[i].photos.photo['@attributes'].id);
				photo.setName(recipesJson[i].photos.photo['@attributes'].name);
				photo.setDescription(recipesJson[i].photos.photo['@attributes'].description);
				photo.setUrl(recipesJson[i].photos.photo['@attributes'].url);
				photo.setOriginalFileName(recipesJson[i].photos.photo['@attributes'].originalFileName);
				photo.setPhotoCategory(recipesJson[i].photos.photo['@attributes'].photoCategory);
				photos.push(photo);
				photoNumber++;
			}
		}
	}
	return photos;
}

function photoLoaded(id) {
	for(var i = 0; i < photos.length; i++) {
		if(photos[i].getId() == id) {
			return true;
		}
	}
	return false;
}

function getPhoto(id) {
	for(var i = 0; i < photos.length; i++) {
		if(photos[i].getId() == id) {
			return photos[i];
		}
	}
	return null;
}

function Photo() {
	this.listNumber;
	this.id;
	this.name;
	this.description;
	this.url;
	this.originalFileName;
	this.photoCategory;
}

Photo.prototype.setListNumber = function (value) {
	this.listNumber = value;
}
Photo.prototype.getListNumber = function () {
	return this.listNumber;
}
Photo.prototype.setId = function (value) {
	this.id = value;
}
Photo.prototype.getId = function () {
	return this.id;
}
Photo.prototype.setName = function (value) {
	this.name = value;
}
Photo.prototype.getName = function () {
	return this.name;
}
Photo.prototype.setDescription = function (value) {
	this.description = value;
}
Photo.prototype.getDescription = function () {
	return this.description;
}
Photo.prototype.setUrl = function (value) {
	this.url = value;
}
Photo.prototype.getUrl = function () {
	return this.url;
}
Photo.prototype.setOriginalFileName = function (value) {
	this.originalFileName = value;
}
Photo.prototype.getOriginalFileName = function () {
	return this.originalFileName;
}
Photo.prototype.setPhotoCategory = function (value) {
	this.photoCategory = value;
}
Photo.prototype.getPhotoCategory = function () {
	return this.photoCategory;
}