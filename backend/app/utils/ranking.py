def calculate_ranks(players):

    rank = 1

    ranked = []

    for p in players:

        ranked.append({

            "id": p.id,

            "name": p.name,

            "score": p.score,

            "rank": rank
        })

        rank += 1

    return ranked