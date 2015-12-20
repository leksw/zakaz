# -*- coding: utf-8 -*-
import json

def get_request_data(sign, dict_request, n=3):
    """
    Search in request dinamically formed fields data
    and prepare its to past in db:
    sign - 
    dict_request - 
    n -
    """
    data = filter(lambda x: x.startswith(sign), dict_request)
    data = sorted(data, key=lambda number: int(number[-1]))
    data = [({data[0+i*n].split('_')[1]:dict_request.get(data[0+i*n]),
            data[1+i*n].split('_')[1]:dict_request.get(data[1+i*n]),
            data[2+i*n].split('_')[1]:dict_request.get(data[2+i*n])
            }) for i in range(int(len(data)/n))]

    return data

def get_dict_errors_formset(formset):
    prefix = formset.get_default_prefix()
    errors_dict = {}

    for index, errors in enumerate(formset.errors):
        for error in errors:
            name = "%s-%d-%s" % (prefix, index, error)
            errors_dict[name] = errors[error]
            
    return json.dumps(errors_dict)