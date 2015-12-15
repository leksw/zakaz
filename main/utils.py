# -*- coding: utf-8 -*-


def get_request_adddata(sign, dict_request, n=3):
    """
    
    """
    data = filter(lambda x: x.startswith(sign), dict_request)
    data = sorted(data, key=lambda number: int(number[-1]))
    data = [({data[0+i*n].split('_')[1]:dict_request.get(data[0+i*n]),
            data[1+i*n].split('_')[1]:dict_request.get(data[1+i*n]),
            data[2+i*n].split('_')[1]:dict_request.get(data[2+i*n])
            }) for i in range(int(len(data)/n))]

    return data
