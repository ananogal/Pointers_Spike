Pointer = new Mongo.Collection('pointers')

if (Meteor.isClient) {

  var id = new Mongo.ObjectID

  Template.phone.rendered = function(){
    var el = this.find('section.phone')
    Hammer(el).on('tap', function(e){
      console.log(id._str)
      Pointer.insert({_id: id._str,x: 0,y: 0})
    })
    Hammer(el).on('hammer.input', function(e){
      Pointer.remove(id._str)
    })
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
