/**
 * The Seam Book — classic stitches, hems, and fabric joins.
 */
window.SEAM_BOOK = {
  categories: [
    {
      id: "joins",
      label: "Joins",
      blurb: "Classic ways to sew two pieces of fabric together.",
    },
    {
      id: "hems",
      label: "Hems",
      blurb: "Ways to finish a garment or cloth edge so it hangs clean.",
    },
    {
      id: "finishes",
      label: "Finishes",
      blurb: "Edge treatments that stop fraying and tidy the inside.",
    },
    {
      id: "stitches",
      label: "Stitches",
      blurb: "The basic machine stitches behind most home sewing.",
    },
  ],
  entries: [
    {
      id: "plain-seam",
      category: "joins",
      title: "Plain seam",
      summary: "The foundation join: right sides together, one line of stitching, then press.",
      when: "Almost every woven garment — side seams, shoulders, skirts, and pillows.",
      cover: "assets/photos/plain-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/plain-seam-1.jpg",
          text: "Place the pieces right sides together. Match notches and raw edges. Pin or baste.",
        },
        {
          photo: "assets/photos/plain-seam-2.jpg",
          text: "Sew a straight stitch on the seam line (often 5/8\" / 1.5 cm from the edge). Backstitch at both ends.",
        },
        {
          photo: "assets/photos/plain-seam-3.jpg",
          text: "Press the stitching flat to set it, then press the allowances open or to one side as the pattern directs.",
        },
      ],
      tip: "Pressing is half the seam. A neat press makes ordinary stitching look finished.",
    },
    {
      id: "french-seam",
      category: "joins",
      title: "French seam",
      summary: "A self-enclosed seam with no raw edges left showing — elegant inside and out.",
      when: "Sheer fabrics, unlined blouses, baby clothes, and lightweight cottons.",
      cover: "assets/photos/french-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/french-seam-1.jpg",
          text: "Place pieces wrong sides together. Sew a narrow first seam (about 3/8\" if your final allowance is 5/8\").",
        },
        {
          photo: "assets/photos/french-seam-2.jpg",
          text: "Trim the allowance close to the stitching (about 1/8\"). Press the seam to one side.",
        },
        {
          photo: "assets/photos/french-seam-3.jpg",
          text: "Fold right sides together along the seam, enclosing the raw edge. Sew a second seam (about 1/4\"). Press.",
        },
      ],
      tip: "French seams dislike thick fabric and tight curves. Keep them for light-to-medium wovens.",
    },
    {
      id: "flat-felled",
      category: "joins",
      title: "Flat-felled seam",
      summary: "A strong, flat join with the raw edge wrapped inside — classic on jeans and work shirts.",
      when: "Denim, shirts, tote bags, outdoor gear, and any seam that takes stress.",
      cover: "assets/photos/flat-felled-cover.jpg",
      steps: [
        {
          photo: "assets/photos/flat-felled-1.jpg",
          text: "Sew the first seam. For the classic jeans look, start wrong sides together so the fell sits on the outside.",
        },
        {
          photo: "assets/photos/flat-felled-2.jpg",
          text: "Press both allowances to one side. Trim the under allowance shorter (about 1/8\"–1/4\").",
        },
        {
          photo: "assets/photos/flat-felled-3.jpg",
          text: "Fold the wide allowance over the short one, enclosing the raw edge. Press flat and edgestitch the fold down.",
        },
      ],
      tip: "Mock flat-felled is easier: sew right sides together, press both allowances one way, trim the under layer, and topstitch.",
    },
    {
      id: "lapped-seam",
      category: "joins",
      title: "Lapped seam",
      summary: "One piece overlaps the other; you stitch through the overlap.",
      when: "Yokes, applied bands, leather or felt, and some sportswear details.",
      cover: "assets/photos/lapped-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/lapped-seam-1.jpg",
          text: "Mark the overlap depth on both pieces so the join stays even.",
        },
        {
          photo: "assets/photos/lapped-seam-2.jpg",
          text: "Lap the upper piece over the lower piece by the marked amount.",
        },
        {
          photo: "assets/photos/lapped-seam-3.jpg",
          text: "Edgestitch the overlapping edge. Add a second parallel row if you want extra strength.",
        },
      ],
      tip: "On fraying wovens, finish or fold the underside edge before you lap.",
    },
    {
      id: "welt-seam",
      category: "joins",
      title: "Welt seam",
      summary: "A plain seam pressed to one side and topstitched through all layers — tidy and sturdy.",
      when: "Unlined jackets, sportswear, and seams you want flat without a full flat-fell.",
      cover: "assets/photos/welt-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/welt-seam-1.jpg",
          text: "Sew a plain seam with right sides together.",
        },
        {
          photo: "assets/photos/welt-seam-2.jpg",
          text: "Press both seam allowances to one side. Optionally trim the under allowance slightly shorter.",
        },
        {
          photo: "assets/photos/welt-seam-3.jpg",
          text: "From the right side, topstitch parallel to the seam through the garment and both allowances.",
        },
      ],
      tip: "A welt seam is simpler than a flat-fell and still looks intentional from the outside.",
    },
    {
      id: "bound-seam",
      category: "joins",
      title: "Bound / Hong Kong seam",
      summary: "Each seam allowance is wrapped in bias binding for a couture-clean inside.",
      when: "Unlined coats and jackets, and garments where the inside will be seen.",
      cover: "assets/photos/bound-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/bound-seam-1.jpg",
          text: "Sew a plain seam and press the allowances open.",
        },
        {
          photo: "assets/photos/bound-seam-2.jpg",
          text: "Wrap each raw allowance edge with a bias strip. Stitch the first edge of the bias in place.",
        },
        {
          photo: "assets/photos/bound-seam-3.jpg",
          text: "Fold the bias over the raw edge and stitch it down (in the ditch or along the fold).",
        },
      ],
      tip: "Use lightweight silk or rayon bias so the seam stays soft. Cut strips on the true bias.",
    },
    {
      id: "gathered-join",
      category: "joins",
      title: "Gathered join",
      summary: "One edge is drawn up with basting threads, then sewn to a shorter edge.",
      when: "Skirt waists, sleeve caps, ruffles, and soft fullness anywhere you need it.",
      cover: "assets/photos/gathered-join-cover.jpg",
      steps: [
        {
          photo: "assets/photos/gathered-join-1.jpg",
          text: "Sew two parallel rows of long basting within the seam allowance. Leave long thread tails.",
        },
        {
          photo: "assets/photos/gathered-join-2.jpg",
          text: "Pin to the shorter piece at ends and notches. Pull the bobbin threads to gather, and spread the fullness evenly.",
        },
        {
          photo: "assets/photos/gathered-join-3.jpg",
          text: "Sew with a regular-length stitch to join. Remove the basting threads.",
        },
      ],
      tip: "Pull bobbin threads, not needle threads — they slide more easily.",
    },
    {
      id: "double-fold-hem",
      category: "hems",
      title: "Double-fold hem",
      summary: "Turn the edge under twice so no raw edge remains, then stitch.",
      when: "Skirts, shirts, curtains, napkins — the everyday hem for woven cloth.",
      cover: "assets/photos/double-fold-hem-cover.jpg",
      steps: [
        {
          photo: "assets/photos/double-fold-hem-1.jpg",
          text: "Press under a small first fold (about 1/4\"–1/2\") toward the wrong side.",
        },
        {
          photo: "assets/photos/double-fold-hem-2.jpg",
          text: "Press under again to the finished hem depth. Pin or baste.",
        },
        {
          photo: "assets/photos/double-fold-hem-3.jpg",
          text: "Stitch near the upper fold. Press again for a sharp crease.",
        },
      ],
      tip: "Measure from the floor or a dress form so the hem is even before you press.",
    },
    {
      id: "blind-hem",
      category: "hems",
      title: "Blind hem",
      summary: "A hem that barely shows on the right side — machine zigzag or hand catch.",
      when: "Dress pants, pencil skirts, tailored dresses, and formal hems.",
      cover: "assets/photos/blind-hem-cover.jpg",
      steps: [
        {
          photo: "assets/photos/blind-hem-1.jpg",
          text: "Finish the raw edge, then press up the hem depth.",
        },
        {
          photo: "assets/photos/blind-hem-2.jpg",
          text: "Fold the garment back so only the hem allowance and a tiny bite of the fold are under the foot.",
        },
        {
          photo: "assets/photos/blind-hem-3.jpg",
          text: "Sew with a blind-hem stitch or a zigzag that mostly rides the allowance and occasionally catches the fold. Press flat.",
        },
      ],
      tip: "Practice on a scrap sandwich first. Too wide a bite shows; too narrow and the hem falls open.",
    },
    {
      id: "rolled-hem",
      category: "hems",
      title: "Rolled hem",
      summary: "A tiny double-turned hem that rolls the edge into a fine cord.",
      when: "Scarves, chiffon, handkerchiefs, and lightweight blouses.",
      cover: "assets/photos/rolled-hem-cover.jpg",
      steps: [
        {
          photo: "assets/photos/rolled-hem-1.jpg",
          text: "Optional: stitch a guideline near the raw edge and trim close to it so the edge is even.",
        },
        {
          photo: "assets/photos/rolled-hem-2.jpg",
          text: "Roll the edge between your fingers (or use a rolled-hem foot) into a fine double turn.",
        },
        {
          photo: "assets/photos/rolled-hem-3.jpg",
          text: "Straight-stitch close to the inner roll. Work in short sections if you are folding by hand.",
        },
      ],
      tip: "Go slowly on sheers — lightweight fabric shifts easily under the presser foot.",
    },
    {
      id: "zigzag-overcast",
      category: "finishes",
      title: "Zigzag overcast",
      summary: "A zigzag that rides the raw edge so threads cannot ravel — the home-sewer’s serger stand-in.",
      when: "Any fraying woven after a plain seam, or before a single-fold hem.",
      cover: "assets/photos/zigzag-overcast-cover.jpg",
      steps: [
        {
          photo: "assets/photos/zigzag-overcast-1.jpg",
          text: "After sewing (and usually pressing) the seam, locate the raw allowance edge.",
        },
        {
          photo: "assets/photos/zigzag-overcast-2.jpg",
          text: "Set a medium zigzag. Place the edge so the right-hand swing just falls off the fabric.",
        },
        {
          photo: "assets/photos/zigzag-overcast-3.jpg",
          text: "Sew continuously along the edge. Trim stray whiskers only outside the stitching.",
        },
      ],
      tip: "Finish each allowance separately if you will press the seam open; finish together if pressing to one side.",
    },
    {
      id: "straight-stitch",
      category: "stitches",
      title: "Straight stitch",
      summary: "The needle goes straight ahead — the workhorse stitch for seams, topstitching, and basting.",
      when: "Seaming wovens, topstitching, gathering (long length), and construction stitching.",
      cover: "assets/photos/plain-seam-cover.jpg",
      steps: [
        {
          photo: "assets/photos/plain-seam-1.jpg",
          text: "Set the machine to straight stitch (zigzag width = 0). Thread and bobbin should match the fabric weight.",
        },
        {
          photo: "assets/photos/plain-seam-2.jpg",
          text: "Choose length: about 2–2.5 mm for seams, 3–4 mm for basting, 3–3.5 mm for topstitching.",
        },
        {
          photo: "assets/photos/plain-seam-3.jpg",
          text: "Lower the presser foot, sew, and backstitch on permanent seams. Press when finished.",
        },
      ],
      tip: "Test on a scrap of the same fabric and layer count before sewing the garment.",
    },
    {
      id: "zigzag-stitch",
      category: "stitches",
      title: "Zigzag stitch",
      summary: "The needle swings left and right, forming a flexible, covering stitch.",
      when: "Overcasting edges, light knit seams, elastic, appliqué, and decorative accents.",
      cover: "assets/photos/zigzag-overcast-cover.jpg",
      steps: [
        {
          photo: "assets/photos/zigzag-overcast-1.jpg",
          text: "Select zigzag. Width controls the swing; length controls how open or dense the stitch looks.",
        },
        {
          photo: "assets/photos/zigzag-overcast-2.jpg",
          text: "For edge finishes, guide the fabric so the outer swing just clears the cut edge.",
        },
        {
          photo: "assets/photos/zigzag-overcast-3.jpg",
          text: "For a satin look, shorten the length until stitches sit side by side. Use stabilizer under light fabrics.",
        },
      ],
      tip: "If fabric tunnels or puckers, loosen upper tension slightly or add stabilizer underneath.",
    },
  ],
};
