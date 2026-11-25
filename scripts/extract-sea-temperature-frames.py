"""Read the existing GIF as a color field and trace simplified cartoon contours.

The source GIF is retained untouched. This produces native SVG path data for
the site's synchronized, pausable animation, not a new scientific dataset.
"""
import json
import os
from pathlib import Path

os.environ.setdefault("MPLCONFIGDIR", "/private/tmp/twins-matplotlib-cache")
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/research/svpnet-spatiotemporal-forecasting.gif"
OUTPUT = ROOT / "content/sea-temperature-frames.json"
RESOLUTION = 24
PALETTE = ["#a5d9e4", "#8fd8cb", "#bce5c5", "#f1e3ac", "#efbb9d"]

fields, durations = [], []
with Image.open(SOURCE) as gif:
    for index in range(gif.n_frames):
        gif.seek(index)
        rgb = np.asarray(gif.convert("RGB"), dtype=float) / 255
        luminance = rgb @ np.array([.2126, .7152, .0722])
        ys = np.linspace(0, luminance.shape[0], RESOLUTION + 1, dtype=int)
        xs = np.linspace(0, luminance.shape[1], RESOLUTION + 1, dtype=int)
        fields.append(np.array([[luminance[ys[r]:ys[r+1], xs[c]:xs[c+1]].mean()
                                 for c in range(RESOLUTION)] for r in range(RESOLUTION)]))
        durations.append(gif.info.get("duration", 130))

minimum = min(field.min() for field in fields)
maximum = max(field.max() for field in fields)
frames = []
for field in fields:
    normalized = (field - minimum) / (maximum - minimum)
    fig, ax = plt.subplots()
    contours = ax.contourf(np.linspace(0, 400, RESOLUTION), np.linspace(0, 300, RESOLUTION),
                           normalized, levels=[-1, .25, .40, .55, .70, 2])
    bands = []
    for collection, color in zip(contours.collections, PALETTE):
        commands = []
        for path in collection.get_paths():
            for (x, y), code in zip(path.vertices, path.codes):
                if code == 79:
                    commands.append("Z")
                elif code in (1, 2):
                    commands.append(f"{'M' if code == 1 else 'L'}{x:.1f},{y:.1f}")
        bands.append({"color": color, "path": "".join(commands)})
    frames.append(bands)
    plt.close(fig)

OUTPUT.write_text(json.dumps({"source": "/research/svpnet-spatiotemporal-forecasting.gif",
                              "durationsMs": durations, "frames": frames}, separators=(",", ":")))
print(f"Traced {len(frames)} source frames into {OUTPUT.name} ({OUTPUT.stat().st_size:,} bytes)")
