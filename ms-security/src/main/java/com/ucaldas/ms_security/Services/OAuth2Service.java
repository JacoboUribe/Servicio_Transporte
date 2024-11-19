    package com.ucaldas.ms_security.Services;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.http.*;
    import org.springframework.stereotype.Service;
    import org.springframework.util.LinkedMultiValueMap;
    import org.springframework.util.MultiValueMap;
    import org.springframework.web.client.RestTemplate;
    import org.springframework.web.util.UriComponentsBuilder;

    import java.util.Map;

    @Service
    public class OAuth2Service {
        @Autowired
        private RestTemplate restTemplate;

        //GOOGLE
        @Value("${google.client.id}")
        private String client_id_google;

        @Value("${google.client.secret}")
        private String client_secret_google;

        @Value("${google.redirect.url}")
        private String google_redirect;

        @Value("${google.auth.url}")
        private String google_auth;

        @Value("${google.token.url}")
        private String google_token;

        @Value("${google.user.info.url}")
        private String google_info;

        //GITHUB

        @Value("${github.client.id}")
        private String client_id_github;

        @Value("${github.client.secret}")
        private String client_secret_github;

        @Value("${github.redirect.url}")
        private String github_redirect;

        @Value("${github.auth.url}")
        private String github_auth;

        @Value("${github.token.url}")
        private String github_token;

        @Value("${google.user.info.url}")
        private String github_info;

        public String getGoogleAuthUrl(String state) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(google_auth)
                    .queryParam("client_id", client_id_google)
                    .queryParam("redirect_uri", google_redirect)
                    .queryParam("response_type", "code")
                    .queryParam("scope", "openid profile email")
                    .queryParam("state", state)
                    .queryParam("access_type", "offline")
                    .queryParam("prompt", "consent");

            return uriBuilder.toUriString();
        }


        public Map<String, Object> getGoogleAccessToken(String code) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", client_id_google);
            params.add("client_secret", client_secret_google);
            params.add("redirect_uri", google_redirect);
            params.add("grant_type", "authorization_code");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(google_token, request, Map.class);

            return response.getBody();
        }


        public Map<String, Object> getGoogleUserInfo(String accessToken) {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<Void> request = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    google_info,
                    HttpMethod.GET,
                    request,
                    Map.class
            );
            return response.getBody();
        }

        public String getGitHubAuthUrl(String state) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(github_auth)
                    .queryParam("client_id", client_id_github)
                    .queryParam("redirect_uri", github_redirect)
                    .queryParam("response_type", "code")
                    .queryParam("scope", "openid profile email")
                    .queryParam("state", state)
                    .queryParam("access_type", "offline")
                    .queryParam("prompt", "consent");

            return uriBuilder.toUriString();
        }

        public Map<String, Object> getGitHubAccessToken(String code) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", client_id_github);
            params.add("client_secret", client_secret_github);
            params.add("redirect_uri", github_redirect);
            params.add("grant_type", "authorization_code");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(github_token, request, Map.class);

            return response.getBody();
        }

        public Map<String, Object> getGithubUserInfo(String accessToken) {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<Void> request = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    github_info,
                    HttpMethod.GET,
                    request,
                    Map.class
            );
            return response.getBody();
        }
    }
