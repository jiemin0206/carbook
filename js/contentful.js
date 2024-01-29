const client = contentful.createClient({
  space: 'upmrz1fb9c75',
  accessToken: 'k_PQxX4kFsJnzKRr0ZirmgcLfFt4eboN2tc0vFcplkc'
})

client.getEntry('5DYLF7S68ziynIN9cU8vnI')
  .then((entry) => {
    document.getElementById('page-title').innerHTML = entry.fields.title;
    document.getElementById('page-subTitle').innerHTML = entry.fields.subtitle;
  })
  .catch(console.error)

client.getEntries({
  content_type: 'carDetail'
})
  .then(result => {
    console.log(result)
    //loop the result and render to the html
    result.items.map((item) => {
      renderContentToHtml(item.fields)
    })
    carouselInit()
  })
  .catch(e => {
    console.log(e)
    carouselInit()
  })

function renderContentToHtml(content) {
  //build html
  let template = `
  <div class="item">
  <div class="car-wrap rounded">
    <div class="img rounded d-flex align-items-end" style="width:350px; background-image: url(${content.image.fields.file.url});">
    </div>
    <div class="text">
      <h2 class="mb-0"><a href="#">${content.brand}</a></h2>
      <div class="d-flex mb-3">
        <span class="cat">${content.name}</span>
        <p class="price ml-auto">Price: $${content.price}</p>
      </div>
      <p class="d-flex mb-0 d-block"><a href="#" class="btn btn-primary py-2 mr-1">Book now</a> <a href="#"
          class="btn btn-secondary py-2 ml-1">Details</a></p>
    </div>
  </div>
</div>
  `
  document.getElementById('car-list').insertAdjacentHTML('beforeend',template)
}

function carouselInit() {
  var carousel = function() {
		$('.carousel-car').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();
}
