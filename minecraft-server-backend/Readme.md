## API: Покупка доната

`POST /api/donate/buy`

Headers:
- `Authorization: Bearer <токен>`

JSON body:
```json
{
  "rank": "vip",
  "price": 100
}
