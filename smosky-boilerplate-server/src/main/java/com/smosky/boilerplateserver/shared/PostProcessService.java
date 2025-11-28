package com.smosky.boilerplateserver.shared;

import com.smosky.boilerplateserver.spring.dtos.CreateBoilerplateDto;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PostProcessService {

  @Pointcut("execution(* com.smosky.boilerplateserver.spring.jpasql.service.SpringBoilerplateService.downloadBoilerplate(..))")
  public void deleteFileAfterDownloadBoilerplate() {
  }
  @Pointcut("execution(* com.smosky.boilerplateserver.spring.jpasql.service.SpringBoilerplateService.previewBoilerplate(..))")
  public void deleteFileAfterPreviewBoilerplate() {
  }

  @After("deleteFileAfterDownloadBoilerplate()")
  public void deleteFileCallsWithExecutionAdviceDownloadBoilerplate(JoinPoint joinPoint) {
  clean(joinPoint);
  }

  @After("deleteFileAfterPreviewBoilerplate()")
  public void logMethodCallsWithExecutionAdvicePreviewBoilerplate(JoinPoint joinPoint) {
    clean(joinPoint);
  }


private void clean(JoinPoint joinPoint) {
  if (joinPoint.getArgs()[0] != null) {
    CreateBoilerplateDto dto = (CreateBoilerplateDto) joinPoint.getArgs()[0];

    try {
      Files.deleteIfExists(Paths.get("zip/" + dto.getMetadata().getName()+".zip"));
      Files.deleteIfExists(Paths.get("zip-response/" + dto.getMetadata().getName()+ ".zip"));
      deleteFolder(new File("extract-zip/" + dto.getMetadata().getName() ));
    } catch (IOException e) {

      throw new RuntimeException(e);
    }
  }
}
  private void deleteFolder(File folder) {
    if (folder.exists()) {
      File[] files = folder.listFiles();

      if (files != null) {
        for (File file : files) {
          if (file.isDirectory()) {
            // Recursively delete subfolders and their contents
            deleteFolder(file);
          } else {
            // Delete files in the folder
            file.delete();
          }
        }
      }

      // Delete the empty folder
      folder.delete();
    } else {

    }
  }
}
