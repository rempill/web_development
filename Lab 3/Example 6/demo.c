#include <stdio.h>

int main(int argc, char *argv[],char *envp[]){
    printf("Content-type: text/html\n\n");
    printf("Your data has been leaked:<br>");
    for(int i = 0; envp[i] != NULL; ++i){
        printf("%s<br>", envp[i]);
    }
    printf("Anyone can see this data by accessing the URL of this CGI script, so be careful with what you put in the environment variables!");
}