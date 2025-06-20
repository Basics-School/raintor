import { FacebookIcon } from "@workspace/ui/components/icons/facebook-icon";
import { InstagramIcon } from "@workspace/ui/components/icons/instagram-icon";
import { TwitterIcon } from "@workspace/ui/components/icons/twitter-icon";

export function SocialLinks() {
  return (
    <div className="flex flex-col ">

      <span className="text-lg text-black dark:text-foreground  ">
        @wildanney
      </span>
      <div className="flex  justify-center items-center  mt-2">


        {/* Social media icons */}
        <div className="flex  gap-6 items-center ">
        <div className="w-12 h-0.5 bg-black dark:bg-foreground/20"></div>
          <a
            href="#"
            className="text-black/60 dark:text-foreground/60 hover:text-black dark:hover:text-foreground transition-colors duration-200"
            aria-label="Follow us on Facebook"
          >
            <FacebookIcon className="size-6 rotate-90" />
          </a>
          <a
            href="#"
            className="text-black/60 dark:text-foreground/60 hover:text-black dark:hover:text-foreground transition-colors duration-200"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="size-6 rotate-90" />
          </a>
          <a
            href="#"
            className="text-black/60 dark:text-foreground/60 hover:text-black dark:hover:text-foreground transition-colors duration-200"
            aria-label="Follow us on Twitter"
          >
            <TwitterIcon className="size-6 rotate-90" />
          </a>
        </div>
      </div>
    </div>
  );
}
