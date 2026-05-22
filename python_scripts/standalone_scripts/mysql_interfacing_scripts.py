import pymysql.cursors

connection = pymysql.connect(
        host = 'localhost',
        user = 'root',
        password = 'example',
        database = 'testdb'
        )

def create_and_list_testdb():
    with connection:
        try:
            with connection.cursor() as cursor:
                sql = "create database testdb"
                cursor.execute(sql)
        except Exception as e:
            print(e)

        try:
            with connection.cursor() as cursor:
                sql = "show databases"
                cursor.execute(sql)
                result = cursor.fetchall()
                print(result)
        except Exception as e:
            print(e)

def connect_to_test_db_and_show_schema():
    with connection:
        try:
            with connection.cursor() as cursor:
                sql = "describe Config"
                cursor.execute(sql)
                result = cursor.fetchall()
                print(result)
        except Exception as e:
            print(e)

def list_user_from_db():
    with connection:
        try:
            with connection.cursor() as cursor:
                sql = "select * from User"
                cursor.execute(sql)
                result= cursor.fetchall()
                print(result)
        except Exception as e:
            print(e)
# create_and_list_testdb()
# connect_to_test_db_and_show_schema()
list_user_from_db()
