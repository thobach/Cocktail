function Recipe() {
	this.listNumber;
	this.id;
	this.name;
	this.components;
	this.videoIds;
	this.photoIds;
	this.glassId;
	this.price;
	this.rating;
	this.instruction;
	this.description;
	this.source;
	this.workMin;
	this.difficulty;
	this.isOriginal;
	this.isAlcoholic;
	this.alcoholLevel;
	this.caloriesKcal;
	this.volumeCl;
	this.categories;
	this.hasPhotos
}

Recipe.prototype.setListNumber = function (value) {
	this.listNumber = value;
}

Recipe.prototype.getListNumber = function () {
	return this.listNumber;
}

Recipe.prototype.setId = function (value) {
	this.id = value;
}

Recipe.prototype.getId = function () {
	return this.id;
}

Recipe.prototype.setName = function (value) {
	this.name = value;
}

Recipe.prototype.getName = function () {
	return this.name;
}

Recipe.prototype.setComponents = function (value) {
	this.components = value;
}

Recipe.prototype.getComponents = function () {
	return this.components;
}

Recipe.prototype.setVideoIds = function (value) {
	this.videoIds = value;
}

Recipe.prototype.getVideoIds = function () {
	return this.videoIds;
}

Recipe.prototype.setPhotoIds = function (value) {
	this.photoIds = value;
}

Recipe.prototype.getPhotoIds = function () {
	return this.photoIds;
}

Recipe.prototype.setGlassId = function (value) {
	this.glassId = value;
}

Recipe.prototype.getGlassId = function () {
	return this.glassId;
}

Recipe.prototype.setPrice = function (value) {
	this.price = value;
}

Recipe.prototype.getPrice = function () {
	return this.price;
}

Recipe.prototype.setRating = function (value) {
	this.rating = value;
}

Recipe.prototype.getRating = function () {
	return this.rating;
}

Recipe.prototype.setInstruction = function (value) {
	this.instruction = value;
}

Recipe.prototype.getInstruction = function () {
	return this.instruction;
}

Recipe.prototype.setDescription = function (value) {
	this.description = value;
}

Recipe.prototype.getDescription = function () {
	return this.description;
}

Recipe.prototype.setSource = function (value) {
	this.source = value;
}

Recipe.prototype.getSource = function () {
	return this.source;
}

Recipe.prototype.setWorkMin = function (value) {
	this.workMin = value;
}

Recipe.prototype.getWorkMin = function () {
	return this.workMin;
}

Recipe.prototype.setDifficulty = function (value) {
	this.difficulty = value;
}

Recipe.prototype.getDifficulty = function () {
	return this.difficulty;
}

Recipe.prototype.setOriginal = function (value) {
	this.original = value;
}

Recipe.prototype.isOriginal = function () {
	return (this.original == '1' ? true : false);
}

Recipe.prototype.setAlcoholic = function (value) {
	this.alcoholic = value;
}

Recipe.prototype.isAlcoholic = function () {
	return (this.alcoholic == '1' ? true : false);
}

Recipe.prototype.setAlcoholLevel = function (value) {
	this.alcoholLevel = value;
}

Recipe.prototype.getAlcoholLevel = function () {
	return this.alcoholLevel;
}

Recipe.prototype.setCaloriesKcal = function (value) {
	this.caloriesKcal = value;
}

Recipe.prototype.getCaloriesKcal = function () {
	return this.caloriesKcal;
}

Recipe.prototype.setVolumeCl = function (value) {
	this.volumeCl = value;
}

Recipe.prototype.getVolumeCl = function () {
	return this.volumeCl;
}

Recipe.prototype.setCategories = function (value) {
	this.categories = value;
}

Recipe.prototype.getCategories = function () {
	return this.categories;
}

Recipe.prototype.setHasPhotos = function (value) {
	this.hasPhotos = value;
}

Recipe.prototype.getHasPhotos = function () {
	return this.hasPhotos;
}

Recipe.prototype.getTags = function () {
	return (this.isAlcoholic() ? L ('alcoholic', 'alcoholic') : L ('non_alcoholic', 'non-alcoholic')) + (this.isOriginal() ? ', ' + L ('original_recipe', 'original recipe') : '' );
}

Recipe.getRecipes = function (recipesJson, glasses) {
	var recipes = [];
	for(var i = 0; i < recipesJson.length; i++) {
		var recipe = new Recipe();
		recipe.setListNumber(i);
		recipe.setId(recipesJson[i]['@attributes'].id);
		recipe.setGlassId(recipesJson[i]['@attributes'].glass);
		recipe.setName(recipesJson[i]['@attributes'].name);
		recipe.setPrice(recipesJson[i]['@attributes'].price);
		recipe.setRating(recipesJson[i]['@attributes'].rating);
		recipe.setInstruction(recipesJson[i]['@attributes'].instruction);
		recipe.setDescription(recipesJson[i]['@attributes'].description);
		recipe.setSource(recipesJson[i]['@attributes'].source);
		recipe.setWorkMin(recipesJson[i]['@attributes'].workMin);
		recipe.setDifficulty(recipesJson[i]['@attributes'].difficulty);
		recipe.setOriginal(recipesJson[i]['@attributes'].isOriginal);
		recipe.setAlcoholic(recipesJson[i]['@attributes'].isAlcoholic);
		recipe.setAlcoholLevel(recipesJson[i]['@attributes'].alcoholLevel);
		recipe.setCaloriesKcal(recipesJson[i]['@attributes'].caloriesKcal);
		recipe.setVolumeCl(recipesJson[i]['@attributes'].volumeCl);
		recipe.setCaloriesKcal(recipesJson[i]['@attributes'].caloriesKcal);
		
		var photoIds = [];
		if(recipesJson[i].photos == null || recipesJson[i].photos.length == 0){
			recipe.hasPhotos = false;
			photoIds.push(Glass.getGlass(recipe.getGlassId(), glasses).getPhotoId());
		} else if(recipesJson[i].photos.length == undefined) {
			recipe.hasPhotos = true;
			photoIds.push(recipesJson[i].photos.photo['@attributes'].id);
		} else {
			recipe.hasPhotos = true;
			for(var j = 0; j < recipesJson[i].photos.length; j++){
				photoIds.push(recipesJson[i].photos[j].photo['@attributes'].id);
			}
		}
		recipe.setPhotoIds(photoIds);
		
		var videoIds = [];
		if(recipesJson[i].videos == null){
			// ignore
		} else if(recipesJson[i].videos.length == undefined) {
			videoIds.push(recipesJson[i].videos.video['@attributes'].id);
		} else {
			for(var j = 0; j < recipesJson[i].videos.length; j++){
				videoIds.push(recipesJson[i].videos[j].video['@attributes'].id);
			}
		}
		recipe.setVideoIds(videoIds);
		
		var components = [];
		for(var j = 0; j < recipesJson[i].components.component.length; j++){
			var component = new Component();
			component.setAmount(recipesJson[i].components.component[j]['@attributes'].amount);
			component.setIngredientId(recipesJson[i].components.component[j]['@attributes'].ingredient);
			component.setName(recipesJson[i].components.component[j]['@attributes'].name);
			component.setUnit(recipesJson[i].components.component[j]['@attributes'].unit);
			components.push(component);
		}
		recipe.setComponents(components);
		
		recipes.push(recipe);
	}
	return recipes;
}