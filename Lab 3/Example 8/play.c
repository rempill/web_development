#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

struct data {
  int nr;
  int tries;
};

int getIdFromCookie() {
  char *cookie = getenv("HTTP_COOKIE");
  if (cookie == NULL) return -1;
  char *ptr = cookie;
  while ((ptr = strstr(ptr, "id=")) != NULL) {
    if (ptr == cookie || *(ptr - 1) == ' ' || *(ptr - 1) == ';') {
      int id;
      if (sscanf(ptr, "id=%d", &id) == 1) return id;
    }
    ptr++;
  }
  return -1;
}

int getNumberFromQueryString() {
  char *qs = getenv("QUERY_STRING");
  if (qs == NULL) return -1;
  int nr = -1;
  char *ptr = strstr(qs, "nr=");
  if (ptr != NULL) sscanf(ptr, "nr=%d", &nr);
  return nr;
}

int init() {
  int r, id, code;
  char filename[100];
  struct data d;
  srand(getpid());
  r = rand() % 100;

  do {
    id = rand();
    sprintf(filename, "C:/tmp/%d.txt", id);
    code = creat(filename, 0600);
  } while (code < 0);

  d.nr = r;
  d.tries = 0;
  write(code, &d, sizeof(d));
  close(code);
  return id;
}

void destroy(int id) {
  char filename[100];
  sprintf(filename, "C:/tmp/%d.txt", id);
  unlink(filename);
}

int getNumberFromFile(int id) {
  char filename[100];
  int fd;
  struct data d;
  sprintf(filename, "C:/tmp/%d.txt", id);
  fd = open(filename, O_RDWR);
  if (fd < 0) return -1;
  read(fd, &d, sizeof(d));
  d.tries++;
  lseek(fd, 0, SEEK_SET);
  write(fd, &d, sizeof(d));
  close(fd);
  return d.nr;
}

int getNoOfTries(int id) {
  char filename[100];
  int fd;
  struct data d;
  sprintf(filename, "C:/tmp/%d.txt", id);
  fd = open(filename, O_RDONLY);
  if (fd < 0) return 0;
  read(fd, &d, sizeof(d));
  close(fd);
  return d.tries;
}

int isNewUser() {
  char *qs = getenv("QUERY_STRING");
  return (qs == NULL || strcmp(qs, "") == 0);
}

void printForm() {
  printf("<form action='play.cgi' method='get'>\n");
  printf("Nr: <input type='text' name='nr'><br>\n");
  printf("<input type='submit' value='Trimite'>\n");
  printf("</form>");
}

int main() {
  int id, status;
  if (isNewUser()) {
    id = init();
    printf("Set-Cookie: id=%d; path=/\n", id);
    status = 0;
  } else {
    int nr, nr2;
    id = getIdFromCookie();
    nr = getNumberFromQueryString();
    nr2 = getNumberFromFile(id);
    if (nr2 == -1) status = 1;
    else if (nr == nr2) status = 2;
    else if (nr < nr2) status = 3;
    else if (nr > nr2) status = 4;
  }
  printf("Content-type: text/html\n\n");
  printf("<html><body>\n");
  switch (status) {
    case 0 : printf("Ati inceput un joc nou.<br>\n"); printForm(); break;
    case 1 : printf("Eroare. <a href='play.cgi'>New game</a>"); break;
    case 2 : printf("Ghicit din %d incercari. <a href='play.cgi'>New game</a>", getNoOfTries(id)); destroy(id); break;
    case 3 : printf("Prea mic!<br>\n"); printForm(); break;
    case 4 : printf("Prea mare!<br>\n"); printForm(); break;
  }
  printf("</body></html>");
  return 0;
}