def to_dict(instance):
    '''
    Returns a dictionary representation of a SQLAlchemy result
    args instance: SQLAlchemy model instance
    '''
    #title() is used to capitalize the first letter of each word in the string
    return {c.name: getattr(instance, c.name).title() if isinstance(getattr(instance, c.name), str) else getattr(instance, c.name) for c in instance.__table__.columns}