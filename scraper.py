import requests
from pyquery import PyQuery as pq
import json

total = 6571
length = 25
titles = []

class RemoteConnection:
	TOKENS = {
		"jesus":"MiY98cmUcyhcipNsaWjLG2e4VjXnYtMzbqRhWDd1"
		}
	FIREBASE_URL = "https://netflix-trailers.firebaseio.com/"
	def __init__(self, name):
		assert name in self.TOKENS
		self.token = self.TOKENS[name]
		self.name = name
		self.ending = "?auth="+self.token
		self.set_on()
	def to_url(self, stringT):
		assert stringT[0] != "/"
		return self.FIREBASE_URL+stringT+"/.json"+self.ending
	def set_on(self):
		data = {"jesus":"on"}
		result = requests.patch(url = self.to_url("computers"), data=json.dumps(data))
		return result
	def set_off(self):
		data = {"jesus":"off"}
		result = requests.patch(url = self.to_url("computers"), data=json.dumps(data))
		return result
	def post_data(self, data):
		result = requests.patch(url = self.to_url("people"), data=json.dumps(data))
		return result
	def post_p(self, data):
		result = requests.post(url = self.to_url("new"), data=json.dumps(data))
		return result
	def post_data_direction(self, data, direction):
		result = requests.patch(url = self.to_url("trailers"), data=json.dumps(data))
		return result
	def get_data(self, direction):
		result = requests.get(url = self.to_url(direction))
		return result
connection = RemoteConnection("jesus")
for i in range(int(total/length)):
	MASTER_URL = "http://www.allflicks.net/wp-content/themes/responsive/processing/processing_us.php?draw=1&\
				columns[0][data]=box_art&\
				columns[0][name]=&\
				columns[0][searchable]=true&\
				columns[0][orderable]=false&\
				columns[0][search][value]=&\
				columns[0][search][regex]=false&\
				columns[1][data]=title&\
				columns[1][name]=&\
				columns[1][searchable]=true&\
				columns[1][orderable]=true&\
				columns[1][search][value]=&\
				columns[1][search][regex]=false&\
				columns[2][data]=year&\
				columns[2][name]=&\
				columns[2][searchable]=true&\
				columns[2][orderable]=true&\
				columns[2][search][value]=&\
				columns[2][search][regex]=false&\
				columns[3][data]=genre&\
				columns[3][name]=&\
				columns[3][searchable]=true&\
				columns[3][orderable]=true&\
				columns[3][search][value]=&\
				columns[3][search][regex]=false&\
				columns[4][data]=rating&\
				columns[4][name]=&\
				columns[4][searchable]=true&\
				columns[4][orderable]=true&\
				columns[4][search][value]=&\
				columns[4][search][regex]=false&\
				columns[5][data]=available&\
				columns[5][name]=&\
				columns[5][searchable]=true&\
				columns[5][orderable]=true&\
				columns[5][search][value]=&\
				columns[5][search][regex]=false&\
				columns[6][data]=director&\
				columns[6][name]=&\
				columns[6][searchable]=true&\
				columns[6][orderable]=true&\
				columns[6][search][value]=&\
				columns[6][search][regex]=false&\
				columns[7][data]=cast&\
				columns[7][name]=&\
				columns[7][searchable]=true&\
				columns[7][orderable]=true&\
				columns[7][search][value]=&\
				columns[7][search][regex]=false&\
				order[0][column]=5&\
				order[0][dir]=desc&\
				start="+str(i*25)+"&\
				length="+str(i*25+25)+"&\
				search[value]=&\
				search[regex]=false&\
				movies=true&\
				shows=true&\
				documentaries=true&\
				rating=netflix&\
				_=1438680274501"
	r = requests.get(url = MASTER_URL)
	if r.status_code == requests.codes.ok:
		result  = r.content
		result_j = json.loads(result)
		data = result_j[u"data"]
		for element in data:
			title = str(element[u'title']).lower()
			titles.append(title)
			if title != "":
				rr = requests.get(url = 'http://www.allflicks.net/movies/'+str(element[u'id'])+'/')
				if rr.status_code == requests.codes.ok:
					result_trailer = rr.content
					html = pq(result_trailer)
					if len(html(".video-frame")) > 0:
						final_link = str(pq(html(".video-frame")[0]).attr['src']).replace("//www","https://www")
						if final_link != "":
							connection.post_data_direction({title:final_link}, "trailers")
							print {title:final_link}


