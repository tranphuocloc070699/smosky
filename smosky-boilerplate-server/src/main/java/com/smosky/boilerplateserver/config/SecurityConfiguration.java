package com.smosky.boilerplateserver.config;


import com.smosky.boilerplateserver.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//
//import static com.smosky.boilerplateserver.user.Role.ADMIN;
//import static com.smosky.boilerplateserver.user.Role.USER;

//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfiguration {
//
//  private final JwtAuthenticationFilter jwtAuthenticationFilter;
//  private final AuthenticationProvider authenticationProvider;
//  private final AuthenticationEntryPoint authenticationEntryPoint;
//
////  @Bean
//  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//
//    httpSecurity
//            .authorizeHttpRequests(
//                    auth -> auth
//                            .requestMatchers("/posts/**","/boilerplates/**")
//                            .permitAll()
//                            .requestMatchers("/admin/**").hasRole(ADMIN.name())
//                            .requestMatchers("/user/**").hasRole(USER.name())
//                            .anyRequest()
//                            .authenticated()
//            )
//            .authenticationProvider(authenticationProvider)
//            .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
////            .exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint))
//            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
////            .addFilterBefore(filterChainExceptionHandler, LogoutFilter.class)
//            .csrf(AbstractHttpConfigurer::disable);
////            .sessionManagement(session ->
////                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//
//    return httpSecurity.build();
//
//  }
//
//  public CorsConfigurationSource corsConfigurationSource() {
//    CorsConfiguration configuration = new CorsConfiguration();
//    configuration.addAllowedOrigin("http://localhost:8000");
//    configuration.addAllowedOrigin("https://softsky.dev");
//    configuration.addAllowedOrigin("https://www.softsky.dev");
//    configuration.addAllowedMethod("*");
//    configuration.addAllowedHeader("*");
//    configuration.setAllowCredentials(true);
//
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", configuration);
//
//    return source;
//  }
//}