# Topfont backend

This is a simple typescript/express/node HTTP API backend with in-memory
persistance.

## Documentation

There are only two possible actions:

<hr>

```http
GET /
```

This gets the complete list of all vote counts for all glyphs/font names.

<hr>

```http
POST /vote/
{
    "letter": "A",
    "font": "Arial"
}
```

This registers a single vote for a letter/font combo.

<hr>
