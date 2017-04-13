

create view county_qry1
as
SELECT        '2016' AS year, '11/08/2016' AS yeardate, dbo.elex_lkup_county.CountyName, dbo.elex_lkup_county.CountyFIPS, dbo.elex_officelist_2016.officetype, dbo.elex_allraces_cty_2016.TotalVotesOffice, 
                         dbo.elex_allraces_cty_2016.PartyID, dbo.elex_allraces_cty_2016.CandidateVotes, dbo.elex_allraces_cty_2016.PrecinctsReporting, dbo.elex_allraces_cty_2016.TotalPrecincts
FROM            dbo.elex_allraces_cty_2016 LEFT OUTER JOIN
                         dbo.elex_officelist_2016 ON dbo.elex_allraces_cty_2016.OfficeID = dbo.elex_officelist_2016.officeid LEFT OUTER JOIN
                         dbo.elex_lkup_county ON dbo.elex_allraces_cty_2016.CountyID = dbo.elex_lkup_county.CountyID
WHERE        (dbo.elex_officelist_2016.officetype IS NOT NULL)


create view county_qry2
as
SELECT        year, yeardate, countyname, countyfips, officetype, totalvotesoffice, [DFL] AS DFL_votes, [R] AS R_votes, IIF([LIB] > 0, [LIB], 0) AS LIB_votes, IIF([CP] > 0, [CP], 0) AS CP_votes, IIF([SWP] > 0, [SWP], 0) 
                         AS SWP_votes, IIF([GP] > 0, [GP], 0) AS GP_votes, IIF([ADP] > 0, [ADP], 0) AS ADP_votes, IIF([IP] > 0, [IP], 0) AS IP_votes, IIF([LMN] > 0, [LMN], 0) AS LMN_votes, IIF([WI] > 0, [WI], 0) AS writein_votes, 
                         PRECINCTSREPORTING, TOTALPRECINCTS
FROM            (SELECT        *
                          FROM            county_qry1) ps PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [ADP], [IP], [LMN], [WI])) AS pvt


create view county_qry3
as
SELECT        dbo.county_qry2.year, dbo.county_qry2.yeardate, dbo.county_qry2.countyname, dbo.county_qry2.countyfips, dbo.county_qry2.officetype, 
                         dbo.county_qry2.totalvotesoffice, dbo.county_qry2.DFL_votes, dbo.county_qry2.R_votes, 
                         dbo.county_qry2.LIB_votes + dbo.county_qry2.CP_votes + dbo.county_qry2.SWP_votes + dbo.county_qry2.GP_votes + dbo.county_qry2.ADP_votes + dbo.county_qry2.IP_votes
                          + dbo.county_qry2.LMN_votes + dbo.county_qry2.writein_votes AS OTHER, dbo.county_qry2.LIB_votes, dbo.county_qry2.CP_votes, 
                         dbo.county_qry2.SWP_votes, dbo.county_qry2.GP_votes, dbo.county_qry2.ADP_votes, dbo.county_qry2.IP_votes, dbo.county_qry2.LMN_votes, 
                         ROUND(CAST(dbo.county_qry2.DFL_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS dflPct, ROUND(CAST(dbo.county_qry2.R_votes AS float) 
                         / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS gopPct, ROUND(CAST(dbo.county_qry2.LIB_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) 
                         AS LIBPct, ROUND(CAST(dbo.county_qry2.CP_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS CPPct, 
                         ROUND(CAST(dbo.county_qry2.SWP_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS SWPPct, ROUND(CAST(dbo.county_qry2.GP_votes AS float) 
                         / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS GPPct, ROUND(CAST(dbo.county_qry2.ADP_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) 
                         AS ADPPct, ROUND(CAST(dbo.county_qry2.IP_votes AS float) / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS IPPct, ROUND(CAST(dbo.county_qry2.LMN_votes AS float) 
                         / CAST(dbo.county_qry2.totalvotesoffice AS float), 4) AS LMNPct, dbo.county_qry2.PRECINCTSREPORTING, dbo.county_qry2.TOTALPRECINCTS, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, dbo.elex_county_info.Region, 
                         dbo.elex_county_info.[VotingAge ShareCategory], dbo.elex_county_info.PctMillentials, dbo.elex_county_info.PctGenX, dbo.elex_county_info.PctBoomers, dbo.elex_county_info.DFL_PREZ_WINS, 
                         dbo.elex_county_info.OTHER_PREZ_WINS, dbo.elex_county_info.GOP_PREZ_WINS
FROM            dbo.county_qry2 INNER JOIN
                         dbo.elex_county_info ON dbo.county_qry2.countyfips = dbo.elex_county_info.COUNTYFIPS


create view county_qry4_prez
as
select *,
case
when dflpct>goppct and dflpct>libpct and dflpct>cppct and dflpct>swppct and dflpct>swppct and dflpct>gppct and dflpct>adppct and dflpct>ippct and dflpct>lmnpct then 'DFL'
when  goppct>dflpct and goppct>libpct and goppct>cppct and goppct>swppct and goppct>swppct and goppct>gppct and goppct>adppct and goppct>ippct and goppct>lmnpct then 'GOP'
else 'Other'
end as Winner
from county_qry3
where officetype='US PRESIDENT'

SELECT *
FROM COUNTY_QRY4_PREZ



CREATE TABLE [dbo].[elex_prez_pct_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO


select *
from elex_prez_pct_2016




create view prez_pct_qry1
as
SELECT        importtime, '2016' AS year, '11/08/2016' AS yeardate, dbo.elex_lkup_precincts_2016.vtdcode, dbo.elex_lkup_precincts_2016.PrecinctName, dbo.elex_lkup_county.CountyName, 
                         dbo.elex_lkup_county.CountyFIPS, dbo.elex_lkup_precincts_2016.CongDist, dbo.elex_lkup_precincts_2016.LegDist, dbo.elex_officelist_2016.officetype, dbo.elex_prez_pct_2016.TotalVotesOffice, 
                         dbo.elex_prez_pct_2016.PartyID, dbo.elex_prez_pct_2016.CandidateVotes, precinctsreporting, totalprecincts
FROM            dbo.elex_prez_pct_2016 LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 ON dbo.elex_prez_pct_2016.CountyID = dbo.elex_lkup_precincts_2016.CountyID AND 
                         dbo.elex_prez_pct_2016.PrecintNum = dbo.elex_lkup_precincts_2016.PrecinctID LEFT OUTER JOIN
                         dbo.elex_officelist_2016 ON dbo.elex_prez_pct_2016.OfficeID = dbo.elex_officelist_2016.officeid LEFT OUTER JOIN
                         dbo.elex_lkup_county ON dbo.elex_prez_pct_2016.CountyID = dbo.elex_lkup_county.CountyID
WHERE        (dbo.elex_officelist_2016.officetype IS NOT NULL)




create view prez_pct_qry2
as
SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, legdist, officetype, totalvotesoffice, precinctsreporting, totalprecincts, [DFL] AS DFL_votes, [R] AS R_votes, IIF([LIB] > 0, [LIB], 
                         0) AS LIB_votes, IIF([CP] > 0, [CP], 0) AS CP_votes, IIF([SWP] > 0, [SWP], 0) AS SWP_votes, IIF([GP] > 0, [GP], 0) AS GP_votes, IIF([ADP] > 0, [ADP], 0) AS ADP_votes, IIF([IP] > 0, [IP], 0) AS IP_votes, IIF([LMN] > 0, 
                         [LMN], 0) AS LMN_votes, IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT        *
                          FROM            prez_pct_qry1) ps PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [ADP], [IP], [LMN], [WI])) AS pvt


CREATE VIEW prez_pct_qry3
as
SELECT        dbo.prez_pct_qry2.year, dbo.prez_pct_qry2.yeardate, dbo.prez_pct_qry2.countyname, dbo.prez_pct_qry2.countyfips, dbo.prez_pct_qry2.officetype, dbo.prez_pct_qry2.totalvotesoffice, dbo.prez_pct_qry2.DFL_votes, 
                         dbo.prez_pct_qry2.R_votes, 
                         dbo.prez_pct_qry2.LIB_votes + dbo.prez_pct_qry2.CP_votes + dbo.prez_pct_qry2.SWP_votes + dbo.prez_pct_qry2.GP_votes + dbo.prez_pct_qry2.ADP_votes + dbo.prez_pct_qry2.IP_votes + dbo.prez_pct_qry2.LMN_votes + dbo.prez_pct_qry2.writein_votes
                          AS OTHER, dbo.prez_pct_qry2.LIB_votes, dbo.prez_pct_qry2.CP_votes, dbo.prez_pct_qry2.SWP_votes, dbo.prez_pct_qry2.GP_votes, dbo.prez_pct_qry2.ADP_votes, dbo.prez_pct_qry2.IP_votes, 
                         dbo.prez_pct_qry2.LMN_votes, ROUND(CAST(dbo.prez_pct_qry2.DFL_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS dflPct, ROUND(CAST(dbo.prez_pct_qry2.R_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS gopPct, ROUND(CAST(dbo.prez_pct_qry2.LIB_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS LIBPct, 
                         ROUND(CAST(dbo.prez_pct_qry2.CP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS CPPct, ROUND(CAST(dbo.prez_pct_qry2.SWP_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS SWPPct, ROUND(CAST(dbo.prez_pct_qry2.GP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS GPPct, 
                         ROUND(CAST(dbo.prez_pct_qry2.ADP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS ADPPct, ROUND(CAST(dbo.prez_pct_qry2.IP_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS IPPct, ROUND(CAST(dbo.prez_pct_qry2.LMN_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS LMNPct, 
                         dbo.prez_pct_qry2.PRECINCTSREPORTING, dbo.prez_pct_qry2.TOTALPRECINCTS, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 
						 						 CASE WHEN dfl_votes > R_votes AND dfl_votes > lib_votes AND dfl_votes > cp_votes AND dfl_votes > swp_votes AND dfl_votes > swp_votes AND dfl_votes > gp_votes 
						 AND dfl_votes > adp_votes AND dfl_votes > ip_votes AND 
                         dfl_votes > lmn_votes THEN 'DFL' WHEN R_votes > dfl_votes AND R_votes > lib_votes AND R_votes > cp_votes AND R_votes > swp_votes AND R_votes > swp_votes 
						 AND R_votes > gp_votes AND R_votes > adp_votes AND R_votes > ip_votes AND 
                         R_votes > lmn_votes THEN 'GOP' ELSE 'Other' END AS Winner,
						 						 dbo.elex_county_info.Region, 
                         dbo.elex_county_info.[VotingAge ShareCategory], dbo.elex_county_info.PctMillentials, dbo.elex_county_info.PctGenX, dbo.elex_county_info.PctBoomers, dbo.elex_county_info.DFL_PREZ_WINS, 
                         dbo.elex_county_info.OTHER_PREZ_WINS, dbo.elex_county_info.GOP_PREZ_WINS
					 

FROM            dbo.prez_pct_qry2 INNER JOIN
                         dbo.elex_county_info ON dbo.prez_pct_qry2.countyfips = dbo.elex_county_info.COUNTYFIPS




select *
from elex_precinct_summary_2016




CREATE TABLE [dbo].[elex_stsenate_pct_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO




CREATE TABLE [dbo].[elex_sthouse_pct_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO

select *
from elex_sthouse_pct_2016

select *
from elex_stsenate_pct_2016


create view sthouse_pct_qry1
as
SELECT        importtime, '2016' AS year, '11/08/2016' AS yeardate, b.vtdcode, 
b.PrecinctName, c.CountyName, 
                         c.CountyFIPS, b.CongDist, 
						 a.District, officename, candidatename, a.partyid, TotalVotesOffice, 
                         CandidateVotes, PrecinctsReporting, 
						 TotalPrecincts
FROM            dbo.elex_sthouse_pct_2016 a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 b ON a.CountyID = b.CountyID AND 
                         a.PrecintNum = b.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county c ON a.CountyID = c.CountyID




create view sthouse_pct_qry2
as
SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, district, totalvotesoffice, precinctsreporting, totalprecincts, [DFL] AS DFL_votes, [R] AS R_votes, IIF([LIB] > 0, [LIB], 0) 
                         AS LIB_votes, IIF([GP] > 0, [GP], 0) AS GP_votes, IIF([IPL] > 0, [IPL], 0) AS IPL_votes, IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, district, totalvotesoffice, precinctsreporting, totalprecincts, PARTYID, CANDIDATEVOTES
                          FROM            sthouse_pct_qry1) ps PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R], [LIB], [GP], [IPL], [WI])) AS pvt



create view stsenate_pct_qry1
as
SELECT        importtime, '2016' AS year, '11/08/2016' AS yeardate, b.vtdcode, 
b.PrecinctName, c.CountyName, 
                         c.CountyFIPS, b.CongDist, 
						 a.District, officename, candidatename, partyid, TotalVotesOffice, 
                         CandidateVotes, PrecinctsReporting, 
						 TotalPrecincts
FROM            dbo.elex_stsenate_pct_2016 a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 b ON a.CountyID = b.CountyID AND 
                         a.PrecintNum = b.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county c ON a.CountyID = c.CountyID




create view stsenate_pct_qry2
as
SELECT        a.importtime, '2016' AS year, '11/08/2016' AS yeardate, b.vtdcode, b.PrecinctName, c.CountyName, c.CountyFIPS, b.CongDist, a.District, a.OfficeName, a.CandidateName, a.PartyID, a.TotalVotesOffice, 
                         a.CandidateVotes, a.PrecinctsReporting, a.TotalPrecincts
FROM            dbo.elex_stsenate_pct_2016 AS a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 AS b ON a.CountyID = b.CountyID AND a.PrecintNum = b.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county AS c ON a.CountyID = c.CountyID





select *
from mnleg_powerindex_2016




CREATE TABLE [dbo].[elex_sthouse_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO



CREATE TABLE [dbo].[elex_stsenate_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO

select top 100 *
from elex_sthouse_2016

select top 100 *
from elex_stsenate_2016


select partyid, count(*)
from elex_sthouse_2016
group by partyid






CREATE VIEW sthouse_totals_qry1
as
SELECT        importtime, district,  totalvotesoffice, precinctsreporting, totalprecincts, IIF([DFL]>0, [DFL],0) AS DFL_votes, IIF([R]>0, [R],0) AS R_votes, 
                         iif([LIB]>0, [LIB], 0) AS LIB_votes, IIF([IPL]>0, [IPL],0) AS IPL_votes, IIF([GP]>0, [GP], 0) AS GP_votes, IIF([WI]>0, [WI], 0) AS writein_votes
FROM            (SELECT        importtime, district,  totalvotesoffice, precinctsreporting, totalprecincts, PARTYID, CANDIDATEVOTES
                          FROM            elex_sthouse_2016) ps PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R], [LIB], [IPL], [GP],  [WI])) AS pvt

SELECT *
FROM ELEX_STHOUSE_2016
WHERE DISTRICT='12B'


CREATE VIEW sthouse_totals_qry2
as
SELECT        a.district, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                          a.LIB_votes,  a.GP_votes,
                         a.IPL_votes, A.WRITEIN_VOTES, 
						 
						 
						 ROUND(CAST(a.DFL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS dflPct, 
                         ROUND(CAST(a.R_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS gopPct, 
						 ROUND(CAST(a.LIB_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS LIBPct, 
			
						 ROUND(CAST(a.GP_votes AS float)/ CAST(a.totalvotesoffice AS float), 4) AS GPPct, 
                         ROUND(CAST(a.IPL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS IPLPct, 
						  ROUND(CAST(a.wRITEIN_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS WILPct, 
						 a.precinctsreporting, a.totalprecincts, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 
						 CASE WHEN dfl_votes > R_votes AND dfl_votes > lib_votes AND dfl_votes > gp_votes AND dfl_votes > ipL_votes AND DFL_VOTES>WRITEIN_VOTES THEN 'DFL'
						 WHEN R_votes > dfl_votes AND R_votes > lib_votes    AND R_votes > gp_votes  AND R_votes > ipL_votes  AND R_VOTES>WRITEIN_VOTES THEN 'GOP' 
						 ELSE 'Other' END AS Winner
FROM            sthouse_TOTALS_qry1 a 


SELECT PARTYID, COUNT(*)
FROM ELEX_STSENATE_PCT_2016
GROUP BY PARTYID

SELECT *
FROM STSENATE_PCT_QRY2

create view sthouse_qry3_index
as
select a.*, b.lean, b.hotdistrict, b.party, b.tenure, b.pct2014, b.candidate, b.dfl2014, b.gop2014, b.region, b.majority_county
from sthouse_totals_qry2 a inner join mnleg_powerindex_2016 b on a.district=b.district
where b.chamber='house' 



select partyid, count(*)
from elex_stsenate_2016
group by partyid


CREATE VIEW stsenate_totals_qry1
as
SELECT        importtime, district,  totalvotesoffice, precinctsreporting, totalprecincts, IIF([DFL]>0, [DFL],0) AS DFL_votes, IIF([R]>0, [R],0) AS R_votes, 
                         iif([LIB]>0, [LIB], 0) AS LIB_votes, IIF([IP]>0, [IP],0) AS IP_votes, IIF([LMN]>0, [LMN], 0) AS LMN_votes, IIF([WI]>0, [WI], 0) AS writein_votes
FROM            (SELECT        importtime, district,  totalvotesoffice, precinctsreporting, totalprecincts, PARTYID, CANDIDATEVOTES
                          FROM            elex_stSENATE_2016) ps PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R], [LIB], [IP], [LMN],  [WI])) AS pvt





CREATE VIEW stsenate_totals_qry2
as
SELECT        a.district, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                          a.LIB_votes,  a.LMN_votes,
                         a.IP_votes, A.WRITEIN_VOTES, 
						 
						 
						 ROUND(CAST(a.DFL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS dflPct, 
                         ROUND(CAST(a.R_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS gopPct, 
						 ROUND(CAST(a.LIB_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS LIBPct, 
			
						 ROUND(CAST(a.LMN_votes AS float)/ CAST(a.totalvotesoffice AS float), 4) AS LMNPct, 
                         ROUND(CAST(a.IP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS IPPct, 
						  ROUND(CAST(a.wRITEIN_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS WILPct, 
						 a.precinctsreporting, a.totalprecincts, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 
						 CASE WHEN dfl_votes > R_votes AND dfl_votes > lib_votes AND dfl_votes > LMN_votes AND dfl_votes > ip_votes AND DFL_VOTES>WRITEIN_VOTES THEN 'DFL'
						 WHEN R_votes > dfl_votes AND R_votes > lib_votes    AND R_votes > LMN_votes  AND R_votes > ip_votes  AND R_VOTES>WRITEIN_VOTES THEN 'GOP' 
						 ELSE 'Other' END AS Winner
FROM            stSENATE_TOTALS_qry1 a 



create view stsenate_qry3_index
as
select a.*, b.lean, b.hotdistrict, b.party, b.tenure, b.pct2014, b.candidate, b.dfl2014, b.gop2014, b.region, b.majority_county
from stsenate_totals_qry2 a inner join mnleg_powerindex_2016 b on a.district=b.district
where b.chamber='senate' 




CREATE TABLE [dbo].[elex_ushouse_pct_2016](
	[State] [varchar](50) NULL,
	[CountyID] [varchar](50) NULL,
	[PrecintNum] [varchar](50) NULL,
	[OfficeID] [varchar](50) NULL,
	[OfficeName] [varchar](255) NULL,
	[District] [varchar](50) NULL,
	[CandidateID] [varchar](50) NULL,
	[CandidateName] [varchar](255) NULL,
	[Suffix] [varchar](5) NULL,
	[IncumbentCode] [varchar](5) NULL,
	[PartyID] [varchar](50) NULL,
	[PrecinctsReporting] [int] NULL,
	[TotalPrecincts] [int] NULL,
	[CandidateVotes] [int] NULL,
	[PctVotes] [decimal](28, 2) NULL,
	[TotalVotesOffice] [int] NULL,
	[importtime] [datetime] NULL
) ON [PRIMARY]

GO

select *
from elex_ushouse_pct_2016

select partyid, count(*)
from elex_ushouse_pct_2016
group by partyid




create view ushouse_pct_qry1
as
SELECT        importtime, '2016' AS year, '11/08/2016' AS yeardate, b.vtdcode, 
b.PrecinctName, c.CountyName, 
                         c.CountyFIPS, b.CongDist, 
						 a.District, officename, candidatename, a.partyid, TotalVotesOffice, 
                         CandidateVotes, PrecinctsReporting, 
						 TotalPrecincts
FROM            dbo.elex_ushouse_pct_2016 a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 b ON a.CountyID = b.CountyID AND 
                         a.PrecintNum = b.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county c ON a.CountyID = c.CountyID


create view ushouse_pct_qry2
as
SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, district, totalvotesoffice, precinctsreporting, totalprecincts, 
[DFL] AS DFL_votes, [R] AS R_votes,  iif([IP]>0, [IP], 0) AS IP_votes, iif([LMN]>0, [LMN], 0) AS LMN_votes, IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, district, 
totalvotesoffice, precinctsreporting, totalprecincts, PARTYID, CANDIDATEVOTES
                          FROM            ushouse_pct_qry1) ps 
						  PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R],[IP], [LMN], [WI])) AS pvt






CREATE VIEW ushouse_pct_qry3
as
SELECT        a.year, a.vtdcode, a.precinctname, a.countyname, a.congdist, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                          a.LMN_votes, a.IP_votes,  A.WRITEIN_VOTES,
						 
						 
						 ROUND(CAST(a.DFL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS dflPct, 
                         ROUND(CAST(a.R_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS gopPct, 
						 ROUND(CAST(a.LMN_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS LMNPct, 
							
                         ROUND(CAST(a.IP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS IPPct, 
						  ROUND(CAST(a.WRITEIN_votes AS float)/ CAST(a.totalvotesoffice AS float), 4) AS WIPct, 
						 a.precinctsreporting, a.totalprecincts, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 
						 CASE WHEN dfl_votes > R_votes  AND dfl_votes > LMN_votes AND dfl_votes > ip_votes AND DFL_VOTES>WRITEIN_VOTES THEN 'DFL'
						 WHEN R_votes > dfl_votes    AND R_votes > LMN_votes  AND R_votes > ip_votes AND R_VOTES>WRITEIN_VOTES THEN 'GOP' ELSE 'Other' END AS Winner
FROM            ushouse_pct_qry2 a 




select *
from sthouse_qry3_index

select majority_county, count(*)
from mnleg_powerindex_2016
group by majority_county

select *
from mnleg_powerindex_2016
where majority_county='Nobles' or majority_county='Watonwan'


select *
from elex_results_pct_2012
where officename like 'u.s. rep%'

create view ushouse_bycounty
as
select congdist, countyname, countyfips, sum(totalvotesoffice) as TotVotes, sum(dfl_votes) as DFL, sum(R_votes) as R, sum(LMN_votes) as LMN, sum(IP_votes) as IP,
sum(writein_votes) as WI, sum(precinctsreporting) as precreport, sum(totalprecincts) as TotPrecincts
from ushouse_pct_qry3
group by congdist, countyname, countyfips


create view ushouse_pct_2012_qry1
as
SELECT        '2012' as year, b.vtdcode, 
b.PrecinctName, c.CountyName, 
                         c.CountyFIPS, b.CongDist, 
						officename, candidatename, a.partyid, TotalVotesOffice, 
                         CandidateVotes, PrecinctsReporting, 
						 TotalPrecincts
FROM            dbo.elex_results_pct_2012 a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2012 b ON a.CountyID = b.CountyID AND 
                         a.PrecintNum = b.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county c ON a.CountyID = c.CountyID
where officename like 'U.S. Rep%'

select partyid, count(*)
from ushouse_pct_2012_qry1
group by partyid



create view ushouse_pct_2012_qry2
as
SELECT      year, vtdcode, precinctname, countyname, countyfips, congdist,  totalvotesoffice, precinctsreporting, totalprecincts, 
[DFL] AS DFL_votes, [R] AS R_votes,  iif([IP]>0, [IP], 0) AS IP_votes,IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT         year,  vtdcode, precinctname, countyname, countyfips, congdist,  
totalvotesoffice, precinctsreporting, totalprecincts, PARTYID, CANDIDATEVOTES
                          FROM            ushouse_pct_2012_qry1) ps 
						  PIVOT (SUM(CandidateVotes) FOR partyid IN ([DFL], [R],[IP], [WI])) AS pvt



create view ushouse_county_2012
as
select congdist, countyname, countyfips, sum(totalvotesoffice) as TotVotes2012, sum(dfl_votes) as DFL2012, sum(R_votes) as R2012,  sum(IP_votes) as IP2012,
sum(writein_votes) as WI2012, sum(precinctsreporting) as precreport2012, sum(totalprecincts) as TotPrecincts2012
from ushouse_pct_2012_qry2
group by congdist, countyname, countyfips


create view ushouse_compare_to_2012
as
select a.cgdistrict, a.countyname, a.countyfips, a.precreport, a.totprecincts, a.dfl, a.r, a.ip, a.wi, a.totvotes,
						 ROUND(CAST(a.DFL AS float) / CAST(a.totvotes AS float), 4) AS dflPct, 
                         ROUND(CAST(a.R AS float) / CAST(a.totvotes AS float), 4) AS gopPct, 					
                         ROUND(CAST(a.IP AS float) / CAST(a.totvotes AS float), 4) AS IPPct, 
						  ROUND(CAST(a.WI AS float)/ CAST(a.totvotes AS float), 4) AS WIPct, 
                         CASE WHEN a.precreport < a.totprecincts THEN 'Incomplete' WHEN a.precreport = a.totprecincts THEN 'Complete' END AS Status, 
						 
						 CASE WHEN a.dfl > a.r   AND a.dfl > a.ip AND a.dfl>a.wi THEN 'DFL'
						 WHEN a.r>a.dfl and a.r>a.ip and a.r>wi  THEN 'GOP' ELSE 'Other' END AS Winner2016,
b.dfl2012, b.r2012, b.ip2012, b.wi2012,
						 ROUND(CAST(b.DFL2012 AS float) / CAST(b.totvotes2012 AS float), 4) AS dflPct2012, 
                         ROUND(CAST(b.R2012 AS float) / CAST(b.totvotes2012 AS float), 4) AS gopPct2012, 					
                         ROUND(CAST(b.IP2012 AS float) / CAST(b.totvotes2012 AS float), 4) AS IPPct2012, 
						  ROUND(CAST(b.WI2012 AS float)/ CAST(b.totvotes2012 AS float), 4) AS WIPct2012,
		CASE WHEN b.dfl2012 > b.r2012   AND b.dfl2012 > b.ip2012 AND b.dfl2012>b.wi2012 THEN 'DFL'
						 WHEN b.r2012>b.dfl2012 and b.r2012>b.ip2012 and b.r2012>b.wi2012  THEN 'GOP' ELSE 'Other' END AS Winner2012
from ushouse_bycounty	a left join 	ushouse_county_2012 b on rtrim(a.cgdistrict)=rtrim(b.district) and rtrim(a.countyfips)=rtrim(b.countyfips)

select * from ushouse_pct_2012_qry2



CREATE VIEW ushouse_pct_2012_qry3
as
SELECT        a.year, a.vtdcode, a.precinctname, a.countyname, a.district, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                           a.IP_votes,  A.WRITEIN_VOTES,
						 
						 
						 ROUND(CAST(a.DFL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS dflPct, 
                         ROUND(CAST(a.R_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS gopPct, 
							
                         ROUND(CAST(a.IP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS IPPct, 
						  ROUND(CAST(a.WRITEIN_votes AS float)/ CAST(a.totalvotesoffice AS float), 4) AS WIPct, 
						 a.precinctsreporting, a.totalprecincts, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 
						 CASE WHEN dfl_votes > R_votes   AND dfl_votes > ip_votes AND DFL_VOTES>WRITEIN_VOTES THEN 'DFL'
						 WHEN R_votes > dfl_votes    AND R_votes > ip_votes AND R_VOTES>WRITEIN_VOTES THEN 'GOP' ELSE 'Other' END AS Winner
FROM            ushouse_pct_2012_qry2 a 
where totalvotesoffice>0


select *
from ushouse_pct_2012_qry2
where totalvotesoffice=0



create view county_qry1_2012
as
SELECT        '2012' AS year, '11/01/2012' AS yeardate, b.CountyName, b.CountyFIPS, c.officetype, a.TotalVotesOffice, 
                         a.PartyID, a.CandidateVotes, a.PrecinctsReporting, a.TotalPrecincts
FROM            dbo.elex_allraces_cty_2012 a LEFT OUTER JOIN
                         dbo.elex_officelist_2016 c ON a.OfficeID = c.officeid LEFT OUTER JOIN
                         dbo.elex_lkup_county b ON a.CountyID = b.CountyID
WHERE        (c.officetype='US President')


select partyid, count(*)
from county_qry1_2012
group by partyid


create view county_qry2_2012
as
SELECT        year, yeardate, countyname, '27'+RTRIM(countyfips) AS FULLFIPS, officetype, totalvotesoffice, [DFL] AS DFL_votes, [R] AS R_votes, IIF([LIB] > 0, [LIB], 0) AS LIB_votes, 
IIF([CP] > 0, [CP], 0) AS CP_votes, IIF([SWP] > 0, [SWP], 0) 
                         AS SWP_votes, IIF([GP] > 0, [GP], 0) AS GP_votes, IIF([CG] > 0, [CG], 0) AS CG_votes, IIF([IP] > 0, 
						 [IP], 0) AS IP_votes, IIF([LMN] > 0, [LMN], 0) AS LMN_votes, 
						  IIF([GR] > 0, [GR], 0) AS GR_votes, 
						   IIF([JP] > 0, [JP], 0) AS JP_votes, 
						    IIF([SL] > 0, [SL], 0) AS SL_votes, 
						 IIF([WI] > 0, [WI], 0) AS writein_votes, 
                         PRECINCTSREPORTING, TOTALPRECINCTS
FROM            (SELECT        *
                          FROM            county_qry1_2012) ps PIVOT (SUM(CandidateVotes) FOR partyid 
						  IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [CG], [IP], [LMN], [GR], [JP], [SL],[WI])) AS pvt


						
select *
from elex_county_info



CREATE VIEW county_qry3_2012
as
SELECT        a.year, a.yeardate, a.countyname, a.fullfips, a.officetype, a.totalvotesoffice, a.DFL_votes, 
                         a.R_votes, 
                          a.LIB_votes, a.CP_votes, a.SWP_votes, a.GP_votes, a.CG_votes, a.IP_votes, 
                         a.LMN_votes, a.GR_votes, a.JP_votes, a.SL_votes, a.Writein_votes,
						 
						 ROUND(CAST(a.DFL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS dflPct, ROUND(CAST(a.R_votes AS float) 
                         / CAST(a.totalvotesoffice AS float), 4) AS gopPct, ROUND(CAST(a.LIB_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS LIBPct, 
                         ROUND(CAST(a.CP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS CPPct, ROUND(CAST(a.SWP_votes AS float) 
                         / CAST(a.totalvotesoffice AS float), 4) AS SWPPct, ROUND(CAST(a.GP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS GPPct, 
                         
						 ROUND(CAST(a.CG_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS CGPct, 
						 ROUND(CAST(a.IP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS IPPct, 
						 ROUND(CAST(a.LMN_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS LMNPct, 
						 
						  ROUND(CAST(a.GR_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS GRPct, 
						   ROUND(CAST(a.JP_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS JPPct, 
						    ROUND(CAST(a.SL_votes AS float) / CAST(a.totalvotesoffice AS float), 4) AS SLPct, 
						 
						  CASE WHEN dfl_votes > r_votes AND dfl_votes > lib_votes AND dfl_votes > cp_votes AND dfl_votes > swp_votes AND dfl_votes > gp_votes 
						  AND dfl_votes > cg_votes AND dfl_votes > ip_votes AND dfl_votes > lmn_votes AND 
                         dfl_votes > gr_votes and dfl_votes>jp_votes and dfl_votes>sl_votes THEN 'DFL' WHEN 
						 r_votes > dfl_votes AND r_votes > lib_votes AND r_votes > cp_votes AND r_votes > swp_votes
						  AND r_votes > gp_votes AND r_votes > cg_votes AND r_votes > ip_votes AND r_votes > lmn_votes AND 
                         r_votes > gr_votes and r_votes>jp_votes and r_votes>sl_votes THEN 'GOP' ELSE 'Other' END AS Winner,
                         a.PRECINCTSREPORTING, a.TOTALPRECINCTS, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, 
						 B.Region, 
                         B.[VotingAge ShareCategory], B.PctMillentials, B.PctGenX, B.PctBoomers, B.DFL_PREZ_WINS, 
                         B.OTHER_PREZ_WINS, B.GOP_PREZ_WINS
FROM            dbo.county_qry2_2012 a INNER JOIN
                         dbo.elex_county_info b ON a.fullfips = b.fullfips


SELECT *
FROM prez_pct_qry3


create view allraces_pct_qry1
as
SELECT        a.importtime, '2016' AS year, '11/08/2016' AS yeardate, c.vtdcode, c.PrecinctName, b.CountyName, 
                         b.CountyFIPS, c.CongDist, c.LegDist, d.officetype, a.TotalVotesOffice, 
                         a.PartyID, a.CandidateVotes, a.PrecinctsReporting, a.TotalPrecincts
FROM           elex_allraces_pct_2016 a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2016 c ON a.CountyID = c.CountyID AND 
                         a.PrecintNum = c.PrecinctID LEFT OUTER JOIN
                         dbo.elex_officelist_2016 d ON a.OfficeID = d.officeid LEFT OUTER JOIN
                         dbo.elex_lkup_county b ON a.CountyID = b.CountyID
WHERE        (d.officetype IS NOT NULL)	


select partyid, count(*)
from allraces_pct_qry1
group by partyid

SELECT *
FROM ALLRACES_PCT_QRY2

CREATE VIEW allraces_pct_qry2
as
SELECT        importtime, year, yeardate, vtdcode, precinctname, countyname, countyfips, congdist, legdist, officetype, totalvotesoffice, precinctsreporting, totalprecincts, 
[DFL] AS DFL_votes, [R] AS R_votes, IIF([LIB] > 0, [LIB], 0) AS LIB_votes, IIF([CP] > 0, [CP], 0) AS CP_votes, 
IIF([SWP] > 0, [SWP], 0) AS SWP_votes, IIF([GP] > 0, [GP], 0) AS GP_votes, IIF([ADP] > 0, [ADP], 0) AS ADP_votes,
 IIF([IP] > 0, [IP], 0) AS IP_votes, IIF([LMN] > 0, 
                         [LMN], 0) AS LMN_votes,
						  IIF([IPL] > 0, [IPL], 0) AS IPL_votes,
						 
						  IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT        *
                          FROM            allraces_pct_qry1) ps PIVOT (SUM(CandidateVotes) FOR partyid
						   IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [ADP], [IP], [LMN],[IPL], [WI])) AS pvt


###decided to not use this query######
CREATE VIEW allraces_pct_qry3
as
SELECT        a.year, a.yeardate, A.VTDCODE, A.PRECINCTNAME, a.countyname, a.fullfips, A.cg, A.LEGDIST, a.officetype, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                         a.LIB_votes, a.CP_votes, a.SWP_votes, a.GP_votes, a.ADP_votes, a.IP_votes, a.LMN_votes, a.IPL_votes,
                          a.writein_votes,
						  case when
						  dfl_votes>r_votes and dfl_votes>lib_votes and dfl_votes>cp_votes and dfl_votes>swp_votes and dfl_votes>gp_votes
						  and dfl_votes>adp_votes and dfl_votes>ip_votes and dfl_votes>lmn_votes and dfl_votes>ipl_votes and dfl_votes>writein_votes then 'D'
						  WHEN
						  r_votes>dfl_votes and r_votes>lib_votes and r_votes>cp_votes and r_votes>swp_votes and r_votes>gp_votes
						   and r_votes>adp_votes and r_votes>ip_votes and r_votes>lmn_votes and r_votes>ipl_votes and r_votes>writein_votes then 'R'
						   WHEN
						   lib_votes>dfl_votes and lib_votes>r_votes and lib_votes>cp_votes and lib_votes>swp_votes and lib_votes>gp_votes
						    and lib_votes>adp_votes and lib_votes>ip_votes and lib_votes>lmn_votes and lib_votes>ipl_votes and lib_votes>writein_votes then 'LIB'
							WHEN
							cp_votes>dfl_votes and cp_votes>r_votes and cp_votes>lib_votes and cp_votes>swp_votes and cp_votes>gp_votes
							 and cp_votes>adp_votes and cp_votes>ip_votes and cp_votes>lmn_votes and cp_votes>ipl_votes and cp_votes>writein_votes then 'CP'
						  WHEN
						  SWP_VOTES>DFL_VOTES AND swp_votes>r_votes AND swp_votes>lib_votes AND swp_votes>cp_votes AND swp_votes>gp_votes
						   AND swp_votes>adp_votes AND swp_votes>ip_votes AND swp_votes>lmn_votes AND swp_votes>ipl_votes and swp_votes>writein_votes then 'SWP'
						  WHEN
						  gp_votes>dfl_votes and gp_votes>r_votes and gp_votes>lib_votes and gp_votes>cp_votes and gp_votes>swp_votes
						   and gp_votes>adp_votes and gp_votes>ip_votes and gp_votes>lmn_votes and gp_votes>ipl_votes and gp_votes>writein_votes then 'GP'
						 WHEN
						 adp_votes>dfl_votes and adp_votes>r_votes and adp_votes>lib_votes and adp_votes>cp_votes and adp_votes>swp_votes and adp_votes>gp_votes
						  and adp_votes>ip_votes and adp_votes>lmn_votes and adp_votes>ipl_votes and adp_votes>writein_votes then 'ADP'
						WHEN
						ip_votes>dfl_votes and ip_votes>r_votes and ip_votes>lib_votes and ip_votes>cp_votes and ip_votes>swp_votes and ip_votes>gp_votes
						 and ip_votes>adp_votes and ip_votes>lmn_votes and ip_votes>ipl_votes and ip_votes>writein_votes then 'IP'
						 WHEN
						 ipl_votes>dfl_votes and ipl_votes>r_votes and ipl_votes>lib_votes and ipl_votes>cp_votes and ipl_votes>swp_votes and ipl_votes>gp_votes
						 and ipl_votes>adp_votes and ipl_votes>lmn_votes and ipl_votes>ip_votes and ipl_votes>writein_votes then 'IPL'
						 WHEN
						 LMN_votes>dfl_votes and lmn_votes>r_votes and lmn_votes>lib_votes and lmn_votes>cp_votes and lmn_votes>swp_votes and lmn_votes>gp_votes
						 and lmn_votes>adp_votes and lmn_votes>ip_votes and lmn_votes>ipl_votes and lmn_votes>writein_votes then 'LMN'
						 WHEN
						 writein_votes>dfl_votes and writein_votes>r_votes and writein_votes>lib_votes and writein_votes>cp_votes and writein_votes>swp_votes and writein_votes>gp_votes
						 and writein_votes>adp_votes and writein_votes>ip_votes and writein_votes>ipl_votes and writein_votes>lmn_votes then 'WI'
						 ELSE 'OTH'
						 END AS WINNER
FROM            dbo.allraces_pct_qry2 a INNER JOIN
                         dbo.elex_county_info b ON a.fullfips = b.COUNTYFIPS



SELECT top 100 *
FROM elex_allraces_cty_2016

select *
from stsenate_qry3_index
where winner<>party

select *
from mnleg_powerindex_2016
where chamber='senate'


select *
from sthouse_qry3_index


select *
from elex_lkup_precincts_2016
where vtdcode not in
(select vtdcode from elex_lkup_precincts_2012)

select top 100 * from elex_results_pct_2012



create view prez_pct_qry1_2012
as
SELECT        c.vtdcode, c.PrecinctName, b.CountyName, b.CountyFIPS, c.CongDist, c.LegDist,  a.TotalVotesOffice, a.PartyID, a.CandidateVotes, 
                         a.PrecinctsReporting, a.TotalPrecincts
FROM            dbo.elex_allraces_pct_2012 AS a LEFT OUTER JOIN
                         dbo.elex_lkup_precincts_2012 AS c ON a.CountyID = c.CountyID AND a.PrecintNum = c.PrecinctID LEFT OUTER JOIN
                         dbo.elex_lkup_county AS b ON a.CountyID = b.CountyID
WHERE       officeid='0101'

select partyid, count(*)
from prez_pct_qry1_2012
group by partyid
order by 1


CREATE VIEW prez_pct_qry2_2012
as
SELECT         vtdcode, precinctname, countyname, '27' + rtrim(countyfips) AS fullfips, '0' + rtrim(congdist) AS cg, legdist,  totalvotesoffice, iif([DFL] > 0, 
                         [DFL], 0) AS DFL_votes, IIF([R] > 0, [R], 0) AS R_votes, IIF([LIB] > 0, [LIB], 0) AS LIB_votes, IIF([CP] > 0, [CP], 0) AS CP_votes, IIF([SWP] > 0, [SWP], 0) AS SWP_votes, 
						 IIF([GP] > 0, [GP], 0) AS GP_votes,
						  IIF([CG] > 0, [CG], 0) AS CG_votes, IIF([GR] > 0, [GR], 0) AS GR_votes, IIF([JP] > 0, [JP], 0) AS JP_votes, IIF([SL] > 0, [SL], 0) AS SL_votes, IIF([WI] > 0, [WI], 0) AS writein_votes
FROM            (SELECT        *
                          FROM            PREZ_pct_qry1_2012) ps PIVOT (SUM(CandidateVotes) FOR partyid 
						  IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [WI], [CG], [GR], [JP], [SL])) AS pvt


create view prez_pct_qry3_2012
as
select a.vtdcode, a.precinctname, a.congdist, a.countyid, b.fullfips, b.precinctname as precintnm2012, b.cg, b.legdist, b.totalvotesoffice,b.dfl_votes,
b.r_votes, b.lib_votes, b.cp_votes, b.swp_votes, b.gp_votes, b.writein_votes, b.cg_votes, b.gr_votes, b.jp_votes, b.sl_votes
from elex_lkup_precincts_2016 a left join prez_pct_qry2_2012 b on a.vtdcode=b.vtdcode

SELECT *
FROM ELEX_LKUP_PRECINCTS_2016
WHERE PRECINCTNAME LIKE 'REDWOOD%'

SELECT *
FROM ELEX_LKUP_COUNTY
WHERE COUNTYID='64'

select top 100 *
from county_qry4_prez

select b.region, sum(a.candidatevotes)
from elex_allraces_cty_2012 a inner join elex_county_info b on a.countyid=b.textcountyid
where officeid='0101'
group by b.region



create view precincts_2016_qry1
as
SELECT        importtime, precinctsreporting, totalprecincts, '2016' as year, '11/08/2016' as yeardate, vtdcode, precinctname,   countyname, '27'+rtrim(countyfips) as fullfips,  '0' + rtrim(congdist) AS cg, legdist, officetype, totalvotesoffice, partyid, candidatevotes
                          FROM            elex_allraces_pct_2016 left join elex_lkup_precincts_2016 on elex_allraces_pct_2016.countyid=elex_lkup_precincts_2016.countyid
						  and elex_allraces_pct_2016.precintnum=elex_lkup_precincts_2016.precinctID
						  left join elex_officelist_2016 on elex_allraces_pct_2016.officeid=elex_officelist_2016.officeid
						  left join elex_lkup_county on elex_allraces_pct_2016.countyid=elex_lkup_county.countyid
where officetype is not null

select partyid, count(*)
from precincts_2016_qry1
group by partyid


create view precincts_2016_qry2
as
SELECT         importtime, precinctsreporting, totalprecincts,  year, yeardate, vtdcode, precinctname, countyname, fullfips,cg, legdist, officetype, totalvotesoffice, iif([DFL] > 0, 
                         [DFL], 0) AS DFL_votes, IIF([R] > 0, [R], 0) AS R_votes, IIF([LIB] > 0, [LIB], 0) AS LIB_votes, 
						 IIF([CP] > 0, [CP], 0) AS CP_votes, 
						 IIF([SWP] > 0, [SWP], 0) AS SWP_votes, 
						 IIF([GP] > 0, [GP], 0) AS GP_votes,
						  IIF([ADP] > 0, [ADP], 0) AS ADP_votes, 
						  IIF([IP] > 0, [IP], 0) AS IP_votes,
						  IIF([LMN] > 0, [LMN], 0) AS LMN_votes,
						  IIF([IPL] > 0, [IPL], 0) AS IPL_votes,   
						  IIF([WI] > 0, [WI], 0) AS Writein_votes
FROM            (SELECT        importtime, precinctsreporting, totalprecincts, year, yeardate, vtdcode, precinctname, countyname, fullfips, cg, legdist, officetype, totalvotesoffice, partyid, candidatevotes
                          FROM            precincts_2016_qry1) ps PIVOT (SUM(CandidateVotes) FOR partyid 
						  IN ([DFL], [R], [LIB], [CP], [SWP], [GP], [WI],  [ADP], [IP], [IPL], [LMN])) AS pvt



select top 100 *
from precincts_2016_qry2

select top 100 *
from elex_lkup_precincts_2008

select vtdcode, a.precinctname, a.countyid, a.mcdcode, b.municipality
from elex_lkup_precincts_2016 a left join elex_lkup_mcd b on a.mcdcode=b.mcdcode
where vtdcode is not null


select top 100 *
from prez_pct_qry3

select *
from county_qry4_prez

create view county_votescast_2016
as
select  distinct '27'+rtrim(b.countyfips) as fullfips, b.countyname, a.officename, totalvotesoffice, officetype
from elex_allraces_cty_2016 a inner join elex_lkup_county b on a.countyid=b.countyid
inner join elex_officelist_2016 c on a.officeid=c.officeid
where officetype='US President' or officetype='US Congress'


select  distinct '27'+rtrim(b.countyfips) as fullfips, b.countyname,  a.officename, totalvotesoffice
from elex_allraces_cty_2012 a inner join elex_lkup_county b on a.countyid=b.countyid
where officename like 'U.S. President%' or officename like 'U.S. Rep%'




select top 100 *
from allraces_pct_qry2




create view allraces_pct_qry3
as
SELECT        a.importtime, A.VTDCODE, A.PRECINCTNAME, a.countyname, a.fullfips, A.cg, A.LEGDIST, a.officetype, a.totalvotesoffice, 
                         a.DFL_votes, a.R_votes, 
                         a.LIB_votes, a.CP_votes, a.SWP_votes, a.GP_votes, a.ADP_votes, a.IP_votes, a.LMN_votes, a.IPL_votes,
                          a.writein_votes,
						  case when
						  dfl_votes>r_votes and dfl_votes>lib_votes and dfl_votes>cp_votes and dfl_votes>swp_votes and dfl_votes>gp_votes
						  and dfl_votes>adp_votes and dfl_votes>ip_votes and dfl_votes>lmn_votes and dfl_votes>ipl_votes and dfl_votes>writein_votes then 'D'
						  WHEN
						  r_votes>dfl_votes and r_votes>lib_votes and r_votes>cp_votes and r_votes>swp_votes and r_votes>gp_votes
						   and r_votes>adp_votes and r_votes>ip_votes and r_votes>lmn_votes and r_votes>ipl_votes and r_votes>writein_votes then 'R'
						   WHEN
						   lib_votes>dfl_votes and lib_votes>r_votes and lib_votes>cp_votes and lib_votes>swp_votes and lib_votes>gp_votes
						    and lib_votes>adp_votes and lib_votes>ip_votes and lib_votes>lmn_votes and lib_votes>ipl_votes and lib_votes>writein_votes then 'LIB'
							WHEN
							cp_votes>dfl_votes and cp_votes>r_votes and cp_votes>lib_votes and cp_votes>swp_votes and cp_votes>gp_votes
							 and cp_votes>adp_votes and cp_votes>ip_votes and cp_votes>lmn_votes and cp_votes>ipl_votes and cp_votes>writein_votes then 'CP'
						  WHEN
						  SWP_VOTES>DFL_VOTES AND swp_votes>r_votes AND swp_votes>lib_votes AND swp_votes>cp_votes AND swp_votes>gp_votes
						   AND swp_votes>adp_votes AND swp_votes>ip_votes AND swp_votes>lmn_votes AND swp_votes>ipl_votes and swp_votes>writein_votes then 'SWP'
						  WHEN
						  gp_votes>dfl_votes and gp_votes>r_votes and gp_votes>lib_votes and gp_votes>cp_votes and gp_votes>swp_votes
						   and gp_votes>adp_votes and gp_votes>ip_votes and gp_votes>lmn_votes and gp_votes>ipl_votes and gp_votes>writein_votes then 'GP'
						 WHEN
						 adp_votes>dfl_votes and adp_votes>r_votes and adp_votes>lib_votes and adp_votes>cp_votes and adp_votes>swp_votes and adp_votes>gp_votes
						  and adp_votes>ip_votes and adp_votes>lmn_votes and adp_votes>ipl_votes and adp_votes>writein_votes then 'ADP'
						WHEN
						ip_votes>dfl_votes and ip_votes>r_votes and ip_votes>lib_votes and ip_votes>cp_votes and ip_votes>swp_votes and ip_votes>gp_votes
						 and ip_votes>adp_votes and ip_votes>lmn_votes and ip_votes>ipl_votes and ip_votes>writein_votes then 'IP'
						 WHEN
						 ipl_votes>dfl_votes and ipl_votes>r_votes and ipl_votes>lib_votes and ipl_votes>cp_votes and ipl_votes>swp_votes and ipl_votes>gp_votes
						 and ipl_votes>adp_votes and ipl_votes>lmn_votes and ipl_votes>ip_votes and ipl_votes>writein_votes then 'IPL'
						 WHEN
						 LMN_votes>dfl_votes and lmn_votes>r_votes and lmn_votes>lib_votes and lmn_votes>cp_votes and lmn_votes>swp_votes and lmn_votes>gp_votes
						 and lmn_votes>adp_votes and lmn_votes>ip_votes and lmn_votes>ipl_votes and lmn_votes>writein_votes then 'LMN'
						 WHEN
						 writein_votes>dfl_votes and writein_votes>r_votes and writein_votes>lib_votes and writein_votes>cp_votes and writein_votes>swp_votes and writein_votes>gp_votes
						 and writein_votes>adp_votes and writein_votes>ip_votes and writein_votes>ipl_votes and writein_votes>lmn_votes then 'WI'
						 ELSE 'OTH'
						 END AS WINNER
FROM            dbo.allraces_pct_qry2 a 

select top 100 *
from allraces_pct_qry3

**NOT USING*** 
create view allraces_pct_qry4
as
select vtdcode, precinctname, countyname, officetype, winner, cast(dfl_votes as float)/cast(totalvotesoffice as float) as D_Pct, cast(r_votes as float)/cast(totalvotesoffice as float) as R_Pct
from allraces_pct_qry3
where officetype='US PRESIDENT' 


**NOT USING*** 
create view allraces_pct_qry5
as
select vtdcode, precinctname, countyname, officetype, winner, cast(dfl_votes as float)/cast(totalvotesoffice as float) as D_Pct, cast(r_votes as float)/cast(totalvotesoffice as float) as R_Pct
from allraces_pct_qry3
where officetype='US CONGRESS' 

**NOT USING*** 
create view allraces_pct_qry6
as
select a.*, b.winner as CongressWin, b.D_Pct as Congress_D, b.R_Pct as Congress_R
from allraces_pct_qry4 a inner join allraces_pct_qry5 b on a.vtdcode=b.vtdcode

select top 100 *
from allraces_pct_qry6

select *
from allraces_pct_qry6 
where winner<>congresswin

select top 100 *
from prez_pct_qry3

create view ticketsplitting_qry1
as
SELECT a.vtdcode, a.precinctname, a.countyname, a.countyfips, a.cgdistrict, a.totalvotesoffice as cg_votes, a.dflpct as cg_D,
a.goppct as cg_R, a.ippct as cg_IP, a.LMNpct as cg_LMN, a.wipct as cg_WI, a.winner as cg_winner,
b.totalvotesoffice as prez_votes, b.dflpct as prez_D, b.goppct as prez_r, b.libpct as prez_lib, b.cppct as prez_CP, b.swppct as prez_swp,
gppct as prez_GP, adppct as prez_adp, b.ippct as prez_ip, b.lmnpct as prez_lmn, b.wipct as prez_wi, b.winner as prez_winner, iif(a.winner<>b.winner, 'Split', 'Same') as SplitFlag
from ushouse_pct_qry3 a inner join prez_pct_qry3 b on a.vtdcode=b.vtdcode


select top 100 *
from ticketsplitting_qry2



create view ticketsplitting_qry2
as
SELECT  a.cgdistrict, sum(a.totalvotesoffice) as cg_votes, sum(a.dfl_votes) as cg_D,
sum(a.r_votes) as cg_R, sum(a.ip_votes) as cg_IP, sum(a.LMN_votes) as cg_LMN, sum(a.writein_votes) as cg_WI, 
sum(b.totalvotesoffice) as prez_votes, sum(b.dfl_votes) as prez_D, sum(b.r_votes) as prez_r, sum(b.lib_votes) as prez_lib, sum(b.cp_votes) as prez_CP, 
sum(b.swp_votes) as prez_swp,
sum(b.r_votes) as prez_GP, sum(adp_votes) as prez_adp, sum(b.ip_votes) as prez_ip, sum(b.lmn_votes) as prez_lmn, sum(b.writein_votes) as prez_wi
from ushouse_pct_qry3 a inner join prez_pct_qry3 b on a.vtdcode=b.vtdcode
group by a.cgdistrict



SELECT        dbo.prez_pct_qry2.vtdcode, dbo.prez_pct_qry2.year, dbo.prez_pct_qry2.yeardate, dbo.prez_pct_qry2.countyname, dbo.prez_pct_qry2.countyfips, dbo.prez_pct_qry2.officetype, 
                         dbo.prez_pct_qry2.totalvotesoffice, dbo.prez_pct_qry2.DFL_votes, dbo.prez_pct_qry2.R_votes, 
                         
						 dbo.prez_pct_qry2.LIB_votes, dbo.prez_pct_qry2.CP_votes, dbo.prez_pct_qry2.SWP_votes, dbo.prez_pct_qry2.GP_votes, dbo.prez_pct_qry2.ADP_votes, 
                         dbo.prez_pct_qry2.IP_votes, dbo.prez_pct_qry2.LMN_votes, writein_votes,
						 
						 
						 ROUND(CAST(dbo.prez_pct_qry2.DFL_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS dflPct, 
                         ROUND(CAST(dbo.prez_pct_qry2.R_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS gopPct, ROUND(CAST(dbo.prez_pct_qry2.LIB_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS LIBPct, ROUND(CAST(dbo.prez_pct_qry2.CP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS CPPct, 
                         ROUND(CAST(dbo.prez_pct_qry2.SWP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS SWPPct, ROUND(CAST(dbo.prez_pct_qry2.GP_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS GPPct, ROUND(CAST(dbo.prez_pct_qry2.ADP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS ADPPct, 
                         ROUND(CAST(dbo.prez_pct_qry2.IP_votes AS float) / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS IPPct, ROUND(CAST(dbo.prez_pct_qry2.LMN_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS LMNPct, 
						 
						 ROUND(CAST(dbo.prez_pct_qry2.writein_votes AS float) 
                         / CAST(dbo.prez_pct_qry2.totalvotesoffice AS float), 4) AS WIPct, 
						 
						 
						 
						 dbo.prez_pct_qry2.precinctsreporting, dbo.prez_pct_qry2.totalprecincts, 
                         CASE WHEN precinctsreporting < totalprecincts THEN 'Incomplete' WHEN precinctsreporting = totalprecincts THEN 'Complete' END AS Status, CASE WHEN dfl_votes > R_votes AND dfl_votes > lib_votes AND 
                         dfl_votes > cp_votes AND dfl_votes > swp_votes AND dfl_votes > swp_votes AND dfl_votes > gp_votes AND dfl_votes > adp_votes AND dfl_votes > ip_votes AND 
                         dfl_votes > lmn_votes THEN 'DFL' WHEN R_votes > dfl_votes AND R_votes > lib_votes AND R_votes > cp_votes AND R_votes > swp_votes AND R_votes > swp_votes AND R_votes > gp_votes AND 
                         R_votes > adp_votes AND R_votes > ip_votes AND R_votes > lmn_votes THEN 'GOP' ELSE 'Other' END AS Winner, dbo.elex_county_info.Region, dbo.elex_county_info.[VotingAge ShareCategory], 
                         dbo.elex_county_info.PctMillentials, dbo.elex_county_info.PctGenX, dbo.elex_county_info.PctBoomers, dbo.elex_county_info.DFL_PREZ_WINS, dbo.elex_county_info.OTHER_PREZ_WINS, 
                         dbo.elex_county_info.GOP_PREZ_WINS, dbo.prez_pct_qry2.writein_votes
FROM            dbo.prez_pct_qry2 INNER JOIN
                         dbo.elex_county_info ON dbo.prez_pct_qry2.countyfips = dbo.elex_county_info.COUNTYFIPS


