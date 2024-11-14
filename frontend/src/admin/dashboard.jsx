import React from "react";
import Header from "../components/Header";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function Dashboard() {
    return (
        <>
            <Header />
            <div className="dashboard-container">
                <h1>Tableau de Bord Admin</h1>
                <PowerBIEmbed
                    embedConfig={{
                        type: "report",
                        id: "238143f3-e2c4-44bb-93bf-147c06701a3f",  // Remplace par l'ID de ton rapport Power BI
                        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=238143f3-e2c4-44bb-93bf-147c06701a3f&groupId=6a66a30a-5fd2-4ac6-b9e7-7c170d59c3b1&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",  // Remplace par l'URL d'intégration de ton rapport Power BI
                        accessToken: "H4sIAAAAAAAEACWSt860WAJE3-VLWQnvVvoDGk_T2MZmwMWbi2mgYTTvvt_OZBWUKjin_vpxsmuAGfj574_Gj-tTOuJPnnLxoF0SgOaOkNMlyuVL00dOsZyKFyQ6DThNd5J4p3uc2XG6KY5D1G21AKc4PJGLTrtZb1ttk2mrcvCsa3S-lbsRHi_42asTW0aDq0SCJSqFD3x_MJAB2kJWuOr4lbEnxoBUseKdmHNyXKDqeB-tymaSvpxIMcTSApUhPQ8aedQFperQGtkl2-NpJVgj-EwlG4V43N5yBoF_khl-Ce24dLGDDa5OYN55X9eRw7NjskjAnlvxIStfImam0CgUofja2KRK5fu79LQuRBB7fZR4lKX6g1lLoZ_3ZNacFfoY38CrynBbCmSgObgLQkkS9hEdaKvDr-kO1kKv_V0-LI3Hq975hok5TjoIbuRqlPt7YYDQuL7sBvE1cMhDNwDTtS1JcPAVxu_J69rLyLsKZsTXW1LAzO9TNNX3gajsLRIYSCp_kpP5ICc9ApFZ-MS6ZRfBno5SRMtRfMKCMdD-cB26FxHr3d8P9dCfWpgz7TJG5FrY_Vh32wWp4ctSMM-Z54nYfjnrw1rpRv1E1Geg5LSSmlQIuIh5SAuKmx54N3hvC3hCEBglgxxgtLGeulcy9Es0PFRO8b3b4Tv0Sg1_JEPzuhwvL5qlY6WgazfMTiqKJujZ4WeRTVhsiSELsjve3oY3OXkZH4xtixevTbbk6QCFcSt5WR5uIRRtAKJg8KIwfRg18VBPCcX8fH7caa8LqG2CyjWsL75PaOjh9Z8_P__5Eddr_sBnef3evKf4-9exY5vp2yJIzKd5IZMbbJQMTe3J4JkmD6rkSIMwLTJ3QsxS3gBlOXYgKltwAUNqZkiIhbiY5MeWYj9mnN9xa4XHRp0gNE7US7D4cNs8TK-AbH3Ei3huRaZOIhGy5jGxa0dBY1Rx_MI66u7fHJKtK-qxhSlnhJOpTxtceW7ZLYCZOYc8bpcXKPdXk7v1hlI01SL7QxLjDeM6ny9uGWYeg_-enaS5psXcZjByISS6OhJNdh6ICMZeqS5DojV8931cwFv4SWvPLOLeMl2Ts_A4hF5UAloYBZZbP53pdg3iZNYokJAXXwwfryajCUmPClQtKwX7eEE5Nw2_Zqh0FM5_MV9zU656-EtZbRVPIx2-VqCdeK97XfUgFf5p-W09ZZ99LX9rHYpXd2kYR3eAJdFIt-6P3IOsLzrfU-09jukUvdYHMIv4eAM8oZjhjiZJE-b1s--5lygoRSSRJ_pR-p64nMbfzISpTKPFU4DB4I3qTrgChWF6oZGjDTCEPZWq9UTRGQEt_aCRKma_9nksE3wDr-O07CLlwkl41NcLdcms85mfL2KNlAkjKEv4PO8RbbVLTV74GVi46TJs7X6hPv7aEDsYD_O8XdoUCVO4YKfWkO1nMN1XgicYw_lpYJlHLSmoe4-Mb5qz3nDyVm27UeZJ2gQSll0iTx5cepbw8xmKtFxIc9Vz0FLopraPp5t83_fzLJpEMwkbZu_UUJh8M8ohrbqgnKX_y_j7f-x8_hvaBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzMxNTg3NzMzLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
  "tokenId": "3c9f2858-322e-41cc-b810-c38979df0dc0",
                        tokenType: models.TokenType.Aad,
                    }}
                    cssClassName={"dashboard-embed"}
                    pageView="fitToWidth"
                    onLoad={() => console.log("Dashboard loaded successfully.")}
                    onError={(error) => console.error("Error loading dashboard", error)}
                />
            </div>
        </>
    );
}

export default Dashboard;
