import React from "react";
import Header from "../components/Header";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function Dashboard() {
    return (
        <div>
        <Header />
        <PowerBIEmbed
        embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: 'ac045878-9ce1-4e20-910c-4b2f2aa70a24',
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=ac045878-9ce1-4e20-910c-4b2f2aa70a24&groupId=7dbe80e4-d3bb-4103-8ad0-1750a7b515d2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
            accessToken: "H4sIAAAAAAAEACWSx86zWAJE3-XbMhJgokf6FyaDycmGnYkXTI730up3n2-6t6WSSjp1_vpxP6gbP8XPf3-iK8KyZaSvxHl_gEt9Cf84bCG7vezXNjbxBDELjSpWWzKFPizZlGOquNS6IDMc9fWOsz2acLv1ldc92UGd28gIVqMQEOcHaq5lYRxE65fKWqZwsWBIwPvQyCrvqzBPRCCp7kWVV9W-mrP4DaTa4i4jstmHA8sQejgB3esh5guML0eS8qFJerDQhRE_oB5GchyAp0Cr9fzEdhOHRO5IszpFK0joLmu6PCIqRM8sQyon6I-b9C3tvkinhBUDaifROFAm3_NL54cqCXj_6cuyjtPdgjX3Xla_YchayoKePWV-wDhhqgpD2AlojxoCYFLQhKAvlWOdv92pfuI7sX4Mwv9AyH1jlUvXfZCOFiTrXT5CJ1Ro_M3g6KHKMIJdPjoZct1uDBOyX_zOOYPLC70kuO8aSIhK7ejHfv82UvV0ve8qAw2PTGgam-R7iC22Z5wFkkCHtJbK1j1V6QtPvqISVazg3OUxGvheuJVc0WCvAqpj50yT1cn3Y766CBOGZY1IATXSwwdeeJ13XFXS5DQ4n8w60icYCVPdpQEXh47zOeFvp_W0ttTs0EWbMF2mUXRMorelKo7G3lg15LNBiFBGbxSTGZViw62SaNFDxmeAqXKbpfoe4i4hCAJaSiWesPImnoVM27z29RRTtvIY93n7RYU8HR81ma9rvToT1m5-JrtURGG2oKa2pubN96x5sTU1w1lfoqSxgTAgKnpDwdG7OGlM78-fn__8iAuatvFZol_NtWgPZCC9Ry4RTYYRlENxVE03wt-l0QNKxBr0xZDr8U52lq1ePjOfduY3DLJfkJxsqcz7jfUvfo7PzR-seu7URpDS2_HhAi30ryC9JaHOMNY2Cb6sr7TEYKbA-fStsJYc55TtBqqaXlva5BnVugbKu9eu_B72tuFli6KEKWvpCSUwNHEsZmZ_0Z1wlYeKlXG5Mhi5cu4b0C8izDCownHtKO1qSiCsuNQYbCfiZjVEwJFB5CihjWeBXS5xavJBeL4PBk3Hhw74I5Rg6L6GIl0Ivs5O6JMypIFPDdaSEp6cPz49rUxS4M8G4EpW8LHHq_Dgqc8zbp_GQaMhWziGIDc_ffyLGU2gXPT4lzKxlRHBqeTt2rBhZyvnQsS3_qcVNPXw2fal_K3lSp4olzhN40FswEvVUn_wlIap4-H1p26-i6dmyQkGxHwonWMgvkmXggKlZP0mPU6XH00LVxcEnNq6ZnNkhJGz8d4-GM5Tv5f-NfOnjV94KgsFD5ZssMOzP6zkZFkc1o5aObarvPakXSdgNYyQc0nfgPfEFp6vhJBa8PQRC-tlIJN_PWomF18LGe4vk36s7M5v1HvDSscThl8vk9MpEZQahtS9e1AFjDLBLl1uv6aSY_SOJi0SUnKHk61xW_ukZ0cZNeyWzi0OCzJSsZSA3Wxs_aWdhsfIZwSXY5Qa8oOJhSUaQumJkb4aUi_g4HIPvXKeEgpqGCM7xvB2oPkmMjfe-_8Zf_8P1CMm7doFAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzMzNDE1ODEzLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
            tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
            settings: {
                panes: {
                    filters: {
                        expanded: false,
                        visible: false
                    }
                },
                background: models.BackgroundType.Transparent,
            }
        }}
    
        eventHandlers = {
            new Map([
                ['loaded', function () {console.log('Report loaded');}],
                ['rendered', function () {console.log('Report rendered');}],
                ['error', function (event) {console.log(event.detail);}],
                ['visualClicked', () => console.log('visual clicked')],
                ['pageChanged', (event) => console.log(event)],
            ])
        }
    
        cssClassName = { "reportClass" }
    
        getEmbeddedComponent = { (embeddedReport) => {
            window.report = embeddedReport;
        }}
    />
    </div>
    );
}

export default Dashboard;
