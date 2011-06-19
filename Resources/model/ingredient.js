Ti.include("/data/ingredients.js");

var ingredients = [];
var ingredientCategories = [];

function getIngredients() {
	var ingredientNumber = 0;
	for(var i = 0; i < ingredientsJson.length; i++) {
		var ingredient = new Ingredient();
		ingredient.setListNumber(ingredientNumber);
		ingredient.setId(ingredientsJson[i]['@attributes'].id);
		ingredient.setName(ingredientsJson[i]['@attributes'].name);
		ingredient.setAvgAlcoholLevel(ingredientsJson[i]['@attributes'].avgAlcoholLevel);
		var ingredientCategories2 = [];
		// multiple categories
		if(ingredientsJson[i].ingredientCategories.ingredientCategory instanceof Array) {
			for(var j= 0; j < ingredientsJson[i].ingredientCategories.ingredientCategory.length; j++) {
				ingredientCategories2.push(ingredientsJson[i].ingredientCategories.ingredientCategory[j]['@attributes'].name);
				if(!ingredientCategoryLoaded(ingredientsJson[i].ingredientCategories.ingredientCategory[j]['@attributes'].name)) {
					ingredientCategories.push(ingredientsJson[i].ingredientCategories.ingredientCategory[j]['@attributes'].name);
				}
			}
		}
		// no category
		else if(ingredientsJson[i].ingredientCategories.ingredientCategory == null){
			// ignore
		}
		// one category
		else {
			ingredientCategories2.push(ingredientsJson[i].ingredientCategories.ingredientCategory['@attributes'].name);
			if(!ingredientCategoryLoaded(ingredientsJson[i].ingredientCategories.ingredientCategory['@attributes'].name)) {
				ingredientCategories.push(ingredientsJson[i].ingredientCategories.ingredientCategory['@attributes'].name);
			}
		}

		ingredient.setIngredientCategories(ingredientCategories2);
		ingredients.push(ingredient);
		ingredientNumber++;
	}
}

function ingredientLoaded(id) {
	for(var i = 0; i < ingredients.length; i++) {
		if(ingredients[i].getId() == id) {
			return true;
		}
	}
	return false;
}

function ingredientCategoryLoaded(name) {
	for(var i = 0; i < ingredientCategories.length; i++) {
		if(ingredientCategories[i] == name) {
			return true;
		}
	}
	return false;
}

function getIngredient(id) {
	for(var i = 0; i < ingredients.length; i++) {
		if(ingredients[i].getId() == id) {
			return ingredients[i];
		}
	}
	return null;
}

function getIngredientCategory(name) {
	for(var i = 0; i < ingredientCategories.length; i++) {
		if(ingredientCategories[i] == name) {
			return ingredientCategories[i];
		}
	}
	return null;
}

function Ingredient() {
	this.listNumber;
	this.id;
	this.name;
	this.avgAlcoholLevel;
	this.ingredientCategories;
}

Ingredient.prototype.setListNumber = function (value) {
	this.listNumber = value;
}
Ingredient.prototype.getListNumber = function () {
	return this.listNumber;
}
Ingredient.prototype.setId = function (value) {
	this.id = value;
}
Ingredient.prototype.getId = function () {
	return this.id;
}
Ingredient.prototype.setName = function (value) {
	this.name = value;
}
Ingredient.prototype.getName = function () {
	return this.name;
}
Ingredient.prototype.setAvgAlcoholLevel = function (value) {
	this.avgAlcoholLevel = value;
}
Ingredient.prototype.getAvgAlcoholLevel = function () {
	return this.avgAlcoholLevel;
}
Ingredient.prototype.setIngredientCategories = function (value) {
	this.ingredientCategories = value;
}
Ingredient.prototype.getIngredientCategories = function () {
	return this.ingredientCategories;
}