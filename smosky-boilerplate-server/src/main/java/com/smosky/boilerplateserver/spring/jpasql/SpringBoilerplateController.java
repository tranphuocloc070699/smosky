package com.smosky.boilerplateserver.spring.jpasql;

import com.smosky.boilerplateserver.shared.AppInfoConfigDto;
import com.smosky.boilerplateserver.shared.ResponseDto;
import com.smosky.boilerplateserver.spring.dtos.CreateBoilerplateDto;
import com.smosky.boilerplateserver.spring.dtos.DownloadPreviewRequestDto;
import com.smosky.boilerplateserver.spring.jpasql.service.SpringBoilerplateService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/boilerplates/spring")
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
public class SpringBoilerplateController {
  
  private final AppInfoConfigDto appInfoConfigDto;
  private final SpringBoilerplateService springBoilerplateService;
  public static final String CORRELATION_ID = "X-CORRELATION-ID";
  
  @GetMapping("")
  public ResponseEntity<ResponseDto> fetchAllBoilerplate() {
    return springBoilerplateService.fetchAllBoilerplate();
   /* List<Object[]> nestedArrays = boilerplateRepository.findAllWithStarCounting();

    List<BoilerplateWithReviewCountingDto> resultList = new ArrayList<>();

    for (Object[] nestedArr : nestedArrays) {
      BoilerplateWithReviewCountingDto dto = new BoilerplateWithReviewCountingDto(nestedArr);
      resultList.add(dto);
    }

    return resultList;*/

    /*String[] array = new String[]{"/home/loctran/.nvm/versions/node/v21.2.0/bin/npm", "init", "-y"};
    try {
      Process process = new ProcessBuilder(array).redirectErrorStream(true).start();

      InputStream is = process.getInputStream();
      InputStream error = process.getErrorStream();
      process.getOutputStream();
      BufferedReader reader = new BufferedReader(new InputStreamReader(is));
      BufferedReader errorReader = new BufferedReader(new InputStreamReader(error));

      String line;
      StringBuilder output = new StringBuilder();


      List<String> arr = readOutput(is);
      for (var item : arr) {
        System.out.println(item);
        output.append(item).append("\n");
      }
      return output;
    } catch (IOException e) {
      return e.getMessage();
    }*/
  }

  @GetMapping("{name}")
  public ResponseEntity<ResponseDto> fetchBoilerplateDetail(
      @PathVariable("name") String name
  ) {
    return springBoilerplateService.fetchBoilerplateDetail(name);
  }


//  @CrossOrigin(origins ={"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
  @PostMapping("")
  public ResponseEntity boilerplate(@RequestBody CreateBoilerplateDto dto) {
    return springBoilerplateService.downloadBoilerplate(dto);


  }

//  @CrossOrigin(origins ={"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
  @PostMapping("/preview/download")
  public Object downloadLinkFromPreview(@RequestBody DownloadPreviewRequestDto dto) {
    return springBoilerplateService.downloadBoilerplateFromUrl(dto);
  }

//  @CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
  @PostMapping("/preview")
  public Object previewBoilerplate(@RequestBody CreateBoilerplateDto dto) {
    return springBoilerplateService.previewBoilerplate(dto);
  }




  @GetMapping("/ci-cd")
  public Object getCiCd(@RequestHeader(CORRELATION_ID) String correlationId) {
    System.out.println(String.format(CORRELATION_ID + " found: {} ", correlationId));
    return "ci-cd";
  }

  
  @GetMapping("/contact-info")
  public ResponseEntity<Object> getContactInfo() {
    System.out.println(appInfoConfigDto.getMessage());
    return ResponseEntity.status(HttpStatus.OK).body(appInfoConfigDto);
  }
}
