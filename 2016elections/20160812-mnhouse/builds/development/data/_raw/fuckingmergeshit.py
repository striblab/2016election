import pandas as pd

a = pd.read_csv("CandDiscFilings.csv")
b = pd.read_csv("Candidate.csv")
b = b.dropna(axis=1)
merged = a.merge(b, on='CandRegistrationNumber')
merged.to_csv("candidates_master.csv", index=False)