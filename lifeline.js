var data = [
   {
      "img": "img/235europe.jpg",
      "release": "Nat Welch 2.3.5-europe",
      "changes" : [
         "Nat completed a one month trip to Europe.",
         "Nat visited the UK, including the towns of London, Edinburgh, Glasgow, York and Harrogate.",
         "Nat visited Paris, France."
      ],
   },
   {
      "img" : "img/22.jpg",
      "release" : "Nat Welch 2.2",
      "changes" : [
         "Nat completed his 22nd birthday.",
      ]
   }
];

window.addEvent('domready', function() {
   data.each(function (ev) {
      var release = new Element('div', {class: 'release'});
      var img = null;
      if (ev.img != "")
         img = new Element('img', {src: ev.img});

      var changeUl = new Element('ul', {class: 'changelist'});

      ev.changes.each(function(change) {
         changeUl.adopt(new Element('li', {html: change}));
      });

      release.adopt(new Element('h2', {html: ev.release}), img, changeUl);
      release.addClass('clearfix');
      $('data').adopt(release);
   });
});
