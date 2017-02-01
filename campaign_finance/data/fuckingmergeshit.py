import pandas as pd

a = pd.read_csv("candidates_master.csv")
b = pd.read_csv("CandDiscFilings.csv")
b = b.dropna(axis=1)
merged = a.merge(b, on='CandRegistrationNumber')
merged.to_csv("candidates_master2.csv", index=False)