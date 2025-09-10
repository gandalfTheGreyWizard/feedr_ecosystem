from helpers.Logger import logger
class Parser:
    # namespace should be inside the controller function which is bound against the route 
    def __init__(self):
        self.current_response_objects = {}
        self.current_response_objects['entries'] = []
        self.current_response_objects['feedSources'] = []
        print("parser module started")

    def data_parser(self, entry, feedName = "default", feedSource="default"):
        response_entry = {}
        response_entry['author_detail'] = entry.get('author_dtail')
        response_entry['author'] = entry.get('author')
        response_entry['tags'] = entry.get('tags')
        response_entry['content'] = entry.get('content')
        response_entry['summary'] = entry.get('summary')
        response_entry['link'] = entry.get('link')
        response_entry['title'] = entry.get('title')
        response_entry['title_detail'] = entry.get('title_detail')
        response_entry['media_thumbnail'] = entry.get('media_thumbnail')
        response_entry['feedName'] = feedName
        if feedSource in self.current_response_objects['feedSources']:
            for each_entry in self.current_response_objects['entries']:
                if each_entry['feedSource'] == feedSource:
                    each_entry['feeds'].append(response_entry)
        else:
            self.current_response_objects['feedSources'].append(feedSource)
            new_entry_dict = {}
            new_entry_dict['feedSource'] = feedSource
            new_entry_dict['feeds'] = []
            new_entry_dict['feeds'].append(response_entry)
            self.current_response_objects['entries'].append(new_entry_dict)

    def prepare_and_respond(self):
        return self.current_response_objects
