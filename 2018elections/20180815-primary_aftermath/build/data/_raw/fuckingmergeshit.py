import pandas as pd

a = pd.read_csv("primary.csv")
b = pd.read_csv("pct.csv")
b = b.dropna(axis=1)
merged = a.merge(b, on='geoid')
merged.to_csv("merged.csv", index=False)