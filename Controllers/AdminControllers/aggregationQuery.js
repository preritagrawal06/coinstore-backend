const purchaseTotal = [
    {
      '$match': {
        'itemName': {
          '$nin': [
            'wallet', 'credit', 'debit'
          ]
        }
      }
    }, {
      '$group': {
        '_id': null, 
        'totalAmount': {
          '$sum': '$amount'
        }
      }
    }
]

const depositTotal = [
    {
      '$match': {
        'game': 'wallet'
      }
    }, {
      '$group': {
        '_id': null, 
        'totalAmount': {
          '$sum': '$amount'
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'totalAmount': 1
      }
    }
]

const purchaseEachDay = [
    {
      '$match': {
        'game': {
          '$ne': 'wallet'
        }
      }
    }, {
      '$group': {
        '_id': {
          '$dateToString': {
            'format': '%Y-%m-%d', 
            'date': '$transactionDate'
          }
        }, 
        'totalAmount': {
          '$sum': '$amount'
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
]

const newUserEachDay = [
    {
        '$group': {
            '_id': {
                '$dateToString': {
                    'format': '%Y-%m-%d', 
                    'date': '$createdAt'
                }
            }, 
            'count': {
                '$sum': 1
            }
        }
    }, {
        '$sort': {
            '_id': 1
        }
    }
]

module.exports = {purchaseTotal, depositTotal, purchaseEachDay, newUserEachDay}