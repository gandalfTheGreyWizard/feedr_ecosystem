import redis
try:
    r = redis.Redis(host='localhost', port=6379, db=0, legacy_responses=False)
    r.set('foo', 'bar');
    print(r.get('foo'));
except Exception as err:
    print(err);
