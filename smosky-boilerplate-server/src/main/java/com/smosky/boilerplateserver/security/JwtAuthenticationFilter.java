package com.smosky.boilerplateserver.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smosky.boilerplateserver.shared.ResponseDto;
import com.smosky.boilerplateserver.shared.UserDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  //  @Value("${application.security.jwt.secret-key}")
//  private String secretKey;
  final int size = 16 * 1024 * 1024;
  final ExchangeStrategies strategies = ExchangeStrategies.builder()
          .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
          .build();
  
  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
                                  @NonNull HttpServletResponse response,
                                  @NonNull FilterChain filterChain) {
    try {
      if (request.getHeader("Authorization") == null || request.getHeader("Authorization").isEmpty()) {
        filterChain.doFilter(request, response);
        return;
      }
//      String authorization = request.getHeader("Authorization");
//      HttpHeaders headers = new HttpHeaders();
//      headers.add("Authorization", authorization);
//      headers.add("Content-Type", "application/json");
//      headers.add("X-Rest-Api", "Testing");
//      WebClient webClient = WebClient.builder()
//              .exchangeStrategies(strategies)
//              .baseUrl("http://localhost:8080/auth/profile")
//              .build();
//      Mono<ResponseDto> responseDto = webClient.get().headers(httpHeaders ->httpHeaders.addAll(headers)).retrieve().bodyToMono(ResponseDto.class);
//      Map<String,Object> map = (Map<String,Object>) responseDto.block().getData();
//      final ObjectMapper mapper = new ObjectMapper();
//      UserDto userDto = mapper.convertValue(map.get("user"),UserDto.class);
//      if (userDto != null) {
//        UserDetails userDetails = new UserDetails() {
//          @Override
//          public Collection<? extends GrantedAuthority> getAuthorities() {
//            return userDto.getRole().getAuthorities();
//          }
//
//          @Override
//          public String getPassword() {
//            return  userDto.getPassword();
//          }
//
//          @Override
//          public String getUsername() {
//            return userDto.getEmail();
//          }
//
//          @Override
//          public boolean isAccountNonExpired() {
//            return false;
//          }
//
//          @Override
//          public boolean isAccountNonLocked() {
//            return false;
//          }
//
//          @Override
//          public boolean isCredentialsNonExpired() {
//            return false;
//          }
//
//          @Override
//          public boolean isEnabled() {
//            return false;
//          }
//        };
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                userDetails,
//                null,
//                userDetails.getAuthorities()
//        );
//        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//        SecurityContextHolder.getContext().setAuthentication(authToken);
//      }

      filterChain.doFilter(request, response);
    } catch (IOException e) {
      throw new RuntimeException(e);
    } catch (ServletException e) {
      throw new RuntimeException(e);
    }
  }
}