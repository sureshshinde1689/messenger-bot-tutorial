'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'its_bot') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			text = text.toLowerCase();
			var patt = new RegExp(text);
			var resg = patt.test("generic");
			var amenities = patt.test("amenit");
			var price = patt.test("rate");
			if(!price)
			var price = patt.test("pric");
			var sitevisit = patt.test("site visit");
			var location = patt.test("location");
			if(!location)
			var location = patt.test("address");
			var contactme = patt.test("call me");
			if(!contactme)
			var contactme = patt.test("contact me");
			var area = patt.test("area");
			var possession = patt.test("possession");
			var finance = patt.test("finance");
			if(!finance)
			var finance = patt.test("loan");
			var booking = patt.test("book");
			if (resg) {
				sendGenericMessage(sender)
				continue
			}
			else if (text === 'Details') {
				sendDetailsMessage(sender)
				continue
			}
			else if (text=== 'hello'){
				sendTextMessage(sender, "Hello, I am a chat bot. If you want to more info type generic", token)
			}
			else if (text=== 'hi'){
				sendTextMessage(sender, "Hello, I am a chat bot. If you want to more info type generic", token)
			}
			else if (location){
				sendTextMessage(sender, "NIBM Annexe, Undri-Pisoli Road", token)
			}
			else if (amenities){
				sendTextMessage(sender, "We are offering Gym, Yoga/Meditation Hall, Jogging Track, Party Lawn & much more. Would you like know about Booking Offer? then please type Booking", token)
			}
			else if (area){
				sendTextMessage(sender, "1 BHK is 560 sq ft and 2 BHK is 950 Sq Ft.", token)
			}
			else if (contactme){
				sendTextMessage(sender, "Thank you for contacting us. Please share your contact details at http://www.sunshinehills.in/, our sales representative will get back to you soon.", token)
			}
			else if (price){
				sendTextMessage(sender, "1 BHK will be 28 Lakh (all inclusive) and 2BHK 46 Lakh (all inclusive). Would you like to check our Amenities, please type amenities.", token)
			}
			else if (possession){
				sendTextMessage(sender, "Flats are ready possession flats.", token)
			}
			else if (booking){
				sendTextMessage(sender, "You can book by paying 25000+Taxes. Please share your contact details here: http://www.sunshinehills.in", token)
			}
			else if (sitevisit){
				sendTextMessage(sender, "Sir, please let us know your convenient timings and we will book your site-visit accordingly.", token)
			}
			else if (finance){
				sendTextMessage(sender, "Yes, you can get the home-loan assistance from HDFC, AXIS and SBI.", token)
			}
			else if (text=== 'Will you provide the services to do the site visit?'){
				sendTextMessage(sender, "Our executives will assist you to locate the project. Although we do not provide pick and drop assistance.", token)
			}
			else
			{
				sendTextMessage(sender, "For more details, please visit: http://sunshinehills.in/", token)
			}
			//sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, "For more details, please visit: http://sunshinehills.in/", token)
			//sendGenericMessage(sender)
			continue
		}
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAAEOWbpOgq0BAKuxZBjBJrG8cIhNptdZCzgnOJzBe89SFKBZAXHIlYAZBox8GlkP8z3Xp585gU7C2KGP2EoHWg1HmW8eo6sjH6X2y7HhkOGfXQJML7ZCge8WG0vJuUAkPyvijZBLp5AgGI5gdr84xZAfa3iw8Pi3K3g3VDLpvSBsgZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Club House",
					"subtitle": "Aminities( next)",
					"image_url": "http://sunshinehills.in/img/gallery/1.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},
				{
					"title": "Children Play Park",
					"subtitle": "Aminities( next)",
					"image_url": "http://sunshinehills.in/img/gallery/10.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},
				{
					"title": "Club House",
					"subtitle": "Aminities( next)",
					"image_url": "http://sunshinehills.in/img/gallery/1.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},

				 {
					"title": "Living Room",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://sunshinehills.in/img/gallery/4-tn.jpg",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "this ic contect to display",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


function sendDetailsMessage(sender) {
	let messageDetailsData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "details",
				"elements": [{
					"title": "Project Location",
					"subtitle": "NIBM Annexe, Undri-Pisoli Road",
					"image_url": "http://sunshinehills.in/img/locationmap.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Project location is NIBM Annexe, Undri-Pisoli Road",
					}],
				},
				{
					"title": "What are the areas of 1BHK and 2BHK Flats?",
					"subtitle": "1 BHK 3D View",
					"image_url": "http://sunshinehills.in/img/1bhk-3dview.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},
				{
					"title": "2 BHK 3D View",
					"subtitle": "Aminities( next)",
					"image_url": "http://sunshinehills.in/img/2bhk-3dview.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://sunshinehills.in/",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},

				 {
					"title": "Even Floor Plan",
					"subtitle": "B wing even floor plan",
					"image_url": "http://sunshinehills.in/img/wing-b-evenfloorplan.jpg",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "this is contect to display",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageDetailsData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
