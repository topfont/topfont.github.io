<h1 align=center><a href="https://topfont.github.io">topfont.github.io</a></h1>
<hr>

<p align=center><i>The top font.</i></p>

<br>

<pre align=center>
<img width=500 src="https://github.com/topfont/topfont.github.io/raw/main/frontend/screenshot.png">
</pre>

<br>
<br>

<p align=center><p width=200>
  Topfont  is a community-sourced project to find the best combination font, the <b>Topfont</b>. It works by pitting glyphs from various fonts against eachother 1-on-1, and synthesises a whole new font that uses the most popular letter glyph across all fonts for each letter.

</p></p>

<br>
<hr>
<br>
<br>

**What's all this then?**

Topfont is a quickie project thrown together in a single evening to test a zany concept of mixing and matching glyphs from different fonts.

**Project structure**

The project is split into a simple Create React App frontend and a very basic ts express backend API to store glyph/font name votes.
The frontend is currently hosted with GitHub Pages (using the `docs` folder trick).
The backend is currently hosted on a cloud VM.

**Future work**

If anyone would want to build any further on this idea, they could for instance:

- Add a persistence layer, e.g. postgres, to store votes
- API hardening to detect spam/vote fraud, etc
- API documentation
- Monitoring
- Scaling 
- OG tags
- Lighthouse optimizations
- Add tests
- CI (apart from GitHub Pages)
- Add more fonts, with a smarter loading strategy
- Normalize glyph sizes to get a more coherent-looking <b>Topfont</b>
- Actually package the <b>Topfont</b> as a downloadable, installable font after voting has stabilized
- Use ELO-ranking more better/more fun scoring of glyphs
- ++
