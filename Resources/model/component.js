
function Component() {
	this.ingredientId;
	this.amount;
	this.unit;
	this.name;
}

Component.prototype.setIngredientId = function (value) {
	this.ingredientId = value;
}

Component.prototype.getIngredientId = function () {
	return this.ingredientId;
}

Component.prototype.setName = function (value) {
	this.name = value;
}

Component.prototype.getName = function () {
	return this.name;
}

Component.prototype.setUnit = function (value) {
	this.unit = value;
}

Component.prototype.getUnit = function () {
	return this.unit;
}

Component.prototype.setAmount = function (value) {
	this.amount = value;
}

Component.prototype.getAmount = function () {
	return this.amount;
}

Component.prototype.getText = function () {
	return this.getAmount() + " " + this.getUnit() + " " + this.getName();
}

Component.getIngredientList = function (components){
	var ingredientList = "";
	for (var i = 0; i < components.length; i++) {
		if (components[i] instanceof Component) {
			ingredientList += components[i].getText() + "\n";
		}
	}
	return ingredientList;
}
